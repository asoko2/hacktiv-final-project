<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\BlacklistedTokens;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Shield\Validation\ValidationRules;
use Firebase\JWT\JWT;

class AuthController extends BaseController
{
    use ResponseTrait;
    public function __construct()
    {
        helper('cookie');
    }

    public function login()
    {
        //Codeigniter Shield JWT Auth
        $rules = new ValidationRules();
        $loginRules = $rules->getLoginRules();

        log_message('debug', 'Validate Data');
        if (!$this->validateData($this->request->getJSON(true), $loginRules, )) {
            return $this->fail($this->validator->getErrors());
        }

        // Get credentials for login
        log_message('debug', 'Get credentials');
        $credentials = $this->request->getJSONVar(setting('Auth.validFields'));
        $credentials = array_filter($credentials);
        $credentials['password'] = $this->request->getJsonVar('password');

        $authenticator = auth('session')->getAuthenticator();

        log_message('debug', 'Check credentials');
        $result = $authenticator->check($credentials);

        if (!$result->isOK()) {
            return $this->failUnauthorized($result->reason());
        }

        log_message('debug', 'Get user');
        $user = $result->extraInfo();

        $manager = service('jwtmanager');

        $jwtPayload = [
            'iat' => time(),
            'exp' => time() + 60 * 60 * 6,
            'email' => $user->email,
            'name' => $user->name,
            'username' => $user->username,
        ];

        $token = $manager->generateToken($user, $jwtPayload);

        set_cookie(
            name: 'access_token',
            value: $token,
            expire: 60 * 60 * 6,
            httpOnly: true,
        );

        return $this->respond([
            'status' => ResponseInterface::HTTP_OK,
            'message' => 'Login success',
            'data' => [
                'access_token' => $token
            ]
        ]);
    }

    public function getProfile()
    {
        $user = auth()->user();

        $db = \Config\Database::connect();
        $builder = $db->table('auth_groups_users');

        $userPermissions = $builder->select([
            'auth_groups_users.group as group_name',
            'auth_permissions_users.permission as permission_name'
        ])
            ->join('auth_permissions_users', 'auth_permissions_users.user_id = auth_groups_users.user_id')
            ->where('auth_groups_users.user_id', $user->id)
            ->get()
            ->getResultArray();

        $groupByGroup = [];

        foreach ($userPermissions as $permission) {
            $groupName = $permission['group_name'];
            $permissionName = $permission['permission_name'];

            if (!isset($groupByGroup[$groupName])) {
                $groupByGroup[$groupName] = [];
            }

            $groupByGroup[$groupName][] = $permissionName;
        }

        // $userGroups = $builder->select([
        //     'auth_groups_users.group as group_name',
        // ])
        //     ->where('auth_groups_users.user_id', $user->id)
        //     ->get()
        //     ->getResultArray();

        


        return $this->respond([
            'status' => ResponseInterface::HTTP_OK,
            'data' => [
                'user' => $user,
                'permissions' => $userPermissions,
                'groups' => $groupByGroup
            ]
        ]);
    }

    public function logout()
    {
        $blacklistModel = new BlacklistedTokens();

        $blacklistModel->save([
            'user_id' => auth()->id(),
            'token' => auth()->getTokenFromRequest($this->request)
        ]);

        return $this->respond([
            'message' => 'Logout successful.',
            'logout' => auth('jwt')->logout()
        ]);
    }
}
