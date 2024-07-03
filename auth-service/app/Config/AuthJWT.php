<?php

declare(strict_types=1);

namespace Config;

use CodeIgniter\Shield\Config\AuthJWT as ShieldAuthJWT;

class AuthJWT extends ShieldAuthJWT
{

  public array $defaultClaims = [
    'iss' => 'https://codeigniter.com/',
    'aud' => 'https://codeigniter.com/',
  ];
}
