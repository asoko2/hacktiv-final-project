<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Validation\StrictRules\CreditCardRules;
use CodeIgniter\Validation\StrictRules\FileRules;
use CodeIgniter\Validation\StrictRules\FormatRules;
use CodeIgniter\Validation\StrictRules\Rules;

class Validation extends BaseConfig
{
    // --------------------------------------------------------------------
    // Setup
    // --------------------------------------------------------------------

    /**
     * Stores the classes that contain the
     * rules that are available.
     *
     * @var list<string>
     */
    public array $ruleSets = [
        Rules::class,
        FormatRules::class,
        FileRules::class,
        CreditCardRules::class,
    ];

    /**
     * Specifies the views that are used to display the
     * errors.
     *
     * @var array<string, string>
     */
    public array $templates = [
        'list'   => 'CodeIgniter\Validation\Views\list',
        'single' => 'CodeIgniter\Validation\Views\single',
    ];

    // --------------------------------------------------------------------
    // Rules for login
    // --------------------------------------------------------------------
    public $login = [
        'nip' => [
            'label' => 'NIP',
            'rules' => [
                'required',
                'min_length[4]',
                'max_length[255]',
            ],
            'errors' => [
                'required' => 'NIP wajib diisi',
                'min_length' => 'NIP minimal 4 karakter',
                'max_length' => 'NIP maksimal 255 karakter',
            ],
        ],
        'password' => [
            'label' => 'Password',
            'rules' => 'required',
            'errors' => [
                'required' => 'Password wajib diisi',
            ],
        ],
    ];

    // --------------------------------------------------------------------
    // Rules for add user
    // --------------------------------------------------------------------

    public $addUser = [
        'nip' => [
            'label' => 'NIP',
            'rules' => [
                'required',
                'min_length[4]',
                'max_length[255]',
                'is_unique[users.nip]',
            ],
            'errors' => [
                'required' => 'NIP wajib diisi',
                'min_length' => 'NIP minimal 4 karakter',
                'max_length' => 'NIP maksimal 255 karakter',
                'is_unique' => 'NIP sudah terdaftar',
            ],
        ],
        'username' => [
            'label' => 'Username',
            'rules' => [
                'required',
                'min_length[4]',
                'max_length[255]',
                'is_unique[users.username]',
            ],
            'errors' => [
                'required' => 'Username wajib diisi',
                'min_length' => 'Username minimal 4 karakter',
                'max_length' => 'Username maksimal 255 karakter',
                'is_unique' => 'Username sudah terdaftar',
            ],
        ],
        'name' => [
            'label' => 'Nama',
            'rules' => 'required',
            'errors' => [
                'required' => 'Nama wajib diisi',
            ],
        ],
        'email' => [
            'label' => 'Email',
            'rules' => [
                'required',
                'valid_email',
                'is_unique[users.email]',
            ],
            'errors' => [
                'required' => 'Email wajib diisi',
                'valid_email' => 'Email tidak valid',
                'is_unique' => 'Email sudah terdaftar',
            ],
        ],
        'password' => [
            'label' => 'Password',
            'rules' => [
                'required',
                'min_length[8]',
            ],
            'errors' => [
                'required' => 'Password wajib diisi',
                'min_length' => 'Password minimal 8 karakter',
            ],
        ],
    ];
}
