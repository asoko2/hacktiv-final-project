<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTFilter implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\HTTP\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return RequestInterface|ResponseInterface|string|void
     */
    public function before(RequestInterface $request, $arguments = null)
    {

        if (!$request instanceof IncomingRequest) {
            return;
        }

        $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        $splitHeader = explode(' ', $authHeader);

        log_message('info', 'JWTAuth: AuthHeader: ' . json_encode($splitHeader));

        /** @var JWT $authenticator */
        $authenticator = auth('jwt')->getAuthenticator();

        $token = $authenticator->getTokenFromRequest($request);

        log_message('info', 'JWTAuth: Token: ' . json_encode($token));

        $result = $authenticator->attempt(['token' => $token]);

        log_message('info', 'JWTAuth: Result: ' . json_encode($result->isOK()));
        log_message('info', 'JWTAuth: Result: ' . json_encode($result->reason()));

        if (!$result->isOK()) {
            return Services::response()
                ->setJSON([
                    'error' => $result->reason(),
                ])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        if (setting('Auth.recordActiveDate')) {
            $authenticator->recordActiveDate();
        }
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return ResponseInterface|void
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
