<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Shield\Entities\User;

class UserController extends BaseController
{
    public function getAllUser()
    {
        $users = auth()->getProvider();

        $authenticatedUser = auth()->user();

        $data = $users
            ->select('users.id, users.nip, users.username, users.name, auth_identities.secret as email')
            ->join('auth_identities', 'auth_identities.user_id = users.id')
            ->whereNotIn('users.id', [$authenticatedUser->id])
            ->orderBy('users.id', 'ASC')
            ->findAll();

        return $this->response->setJSON([
            'status' => ResponseInterface::HTTP_OK,
            'message' => 'Success',
            'data' => $data
        ]);
    }

    /**
     * Store a new user
     * @property \Config\AuthGroups $defaultGroup
     */
    public function store()
    {
        $users = auth()->getProvider();

        $data = $this->request->getJSON(true);

        $nipExist = $users->findByCredentials(['nip' => (string) $data['nip']]);

        if ($nipExist) {
            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_CONFLICT,
                'message' => 'NIP sudah terdaftar',
                'data' => null
            ])->setStatusCode(ResponseInterface::HTTP_CONFLICT);
        }

        $emailExist = $users->findByCredentials(['email' => $data['email']]);
        if ($emailExist) {
            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_CONFLICT,
                'message' => 'Email sudah terdaftar',
                'data' => null
            ])->setStatusCode(ResponseInterface::HTTP_CONFLICT);
        }

        $usernameExist = $users->findByCredentials(['username' => $data['username']]);
        if ($usernameExist) {
            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_CONFLICT,
                'message' => 'Username sudah terdaftar',
                'data' => null
            ])->setStatusCode(ResponseInterface::HTTP_CONFLICT);
        }

        try {
            $user = new User([
                'nip' => $data['nip'],
                'username' => $data['username'],
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => '12345678',
            ]);
            $users->save($user);

            $user = $users->findById($users->getInsertID());

            $users->addToDefaultGroup($user);

            $defaultGroup = config('AuthGroups')->defaultGroup;

            $groupPermissions = config('AuthGroups')->groups[$defaultGroup]['permissions'];

            // $user->addPermission('apps.common', 'submission.input', 'submission.update');
            $user->addPermission(...$groupPermissions);

            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_OK,
                'message' => 'Success',
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage(),
                'data' => $data
            ]);
        }
    }

    public function show($id)
    {
        $users = auth()->getProvider();

        $data = $users->select('users.id, users.nip, users.username, users.name, auth_identities.secret as email')
            ->join('auth_identities', 'auth_identities.user_id = users.id')
            ->orderBy('users.id', 'ASC')
            ->findById($id);

        return $this->response->setJSON([
            'status' => ResponseInterface::HTTP_OK,
            'message' => 'Success',
            'data' => $data
        ]);
    }

    public function update($id)
    {
        $users = auth()->getProvider();

        $data = $this->request->getJSON(true);

        $user = $users->findById($id);

        $user->fill($data);

        $users->save($user);

        return $this->response->setJSON([
            'status' => ResponseInterface::HTTP_OK,
            'message' => 'Success',
            'data' => null
        ]);
    }

    public function delete($id)
    {
        $users = auth()->getProvider();

        try {
            $users->delete($id, true);

            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_OK,
                'message' => 'Success',
                'data' => null
            ]);
        } catch (\Exception $e) {
            return $this->response->setJSON([
                'status' => ResponseInterface::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage(),
                'data' => null
            ]);
        }
    }

    /**
     * Add group to user
     * @param $id
     * @property \Config\AuthGroups $groups
     */
    public function syncGroup($id)
    {
        $users = auth()->getProvider();

        $data = $this->request->getJSON(true);

        $user = $users->findById($id);
        
        $user->syncGroups(...$data['groups']);

        foreach ($data['groups'] as $group) {
            $groupPermissions = config('AuthGroups')->groups[$group]['permissions'];
            $user->syncPermissions(...$groupPermissions);
        }

        return $this->response->setJSON([
            'status' => ResponseInterface::HTTP_OK,
            'message' => 'Success',
            'data' => null
        ]);
    }

    public function getUserWithGroup()
    {
        $users = auth()->getProvider();

        log_message('debug', 'getUserWithGroup');

        $data = $users
            ->select([
                'users.id',
                'users.nip',
                'users.username',
                'users.name',
                'auth_identities.secret as email',
            ])
            ->join('auth_identities', 'auth_identities.user_id = users.id')
            ->orderBy('users.id', 'ASC')
            ->findAll();

        foreach ($data as $key => $value) {
            $user = $users->findById($value->id);
            $groups = $user->getGroups();
            $data[$key]->groups = $groups;
        }

        return $this->response->setJSON([
            'status' => ResponseInterface::HTTP_OK,
            'message' => 'Success',
            'data' => $data
        ]);
    }
}
