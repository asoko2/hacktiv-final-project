<?php

declare(strict_types=1);

/**
 * This file is part of CodeIgniter Shield.
 *
 * (c) CodeIgniter Foundation <admin@codeigniter.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace Config;

use CodeIgniter\Shield\Config\AuthGroups as ShieldAuthGroups;

class AuthGroups extends ShieldAuthGroups
{
    /**
     * --------------------------------------------------------------------
     * Default Group
     * --------------------------------------------------------------------
     * The group that a newly registered user is added to.
     */
    public string $defaultGroup = 'pegawai';

    /**
     * --------------------------------------------------------------------
     * Groups
     * --------------------------------------------------------------------
     * An associative array of the available groups in the system, where the keys
     * are the group names and the values are arrays of the group info.
     *
     * Whatever value you assign as the key will be used to refer to the group
     * when using functions such as:
     *      $user->addGroup('superadmin');
     *
     * @var array<string, array<string, string>>
     *
     * @see https://codeigniter4.github.io/shield/quick_start_guide/using_authorization/#change-available-groups for more info
     */
    public array $groups = [
        'atasan' => [
            'title' => 'Atasan',
            'description' => 'First Approval.',
            'permissions' => [
                'submission.first-approval',
                'submission.need-revision',
                'submission.reject',
            ],
        ],
        'pegawai' => [
            'title' => 'Pegawai',
            'description' => 'General users of the site. Often customers.',
            'permissions' => [
                'submission.input',
                'submission.update',
                'apps.common'
            ],
        ],
        'hrd' => [
            'title' => 'HRD',
            'description' => 'Second Approval',
            'permissions' => [
                'users.manage',
                'submission.second-approval',
                'submission.need-revision',
                'submission.reject',
            ],
        ],
        'pengesah' => [
            'title' => 'Pengesah',
            'description' => 'Third Approval',
            'permissions' => [
                'submission.authenticator-approval',
            ],
        ],
    ];

    /**
     * --------------------------------------------------------------------
     * Permissions
     * --------------------------------------------------------------------
     * The available permissions in the system.
     *
     * If a permission is not listed here it cannot be used.
     */
    public array $permissions = [
        'apps.common' => 'Common permission',
        'users.manage' => 'Manage users',
        'submission.first-approval' => 'First person to approve submission',
        'submission.second-approval' => 'Second person to approve submission',
        'submission.need-revision' => 'Need revision',
        'submission.reject' => 'Reject Submission',
        'submission.authenticator-approval' => 'Approve Submission',
        'submission.input' => 'Input new submission',
        'submission.update' => 'Update submission',
    ];

    /**
     * --------------------------------------------------------------------
     * Permissions Matrix
     * --------------------------------------------------------------------
     * Maps permissions to groups.
     *
     * This defines group-level permissions.
     */
    public array $matrix = [
        // 'superadmin' => [
        //     'apps.*',
        //     'users.*',
        //     'submission.*',
        // ],
        'atasan' => [
            'apps.*',
            'submission.first-approval',
            'submission.need-revision',
            'submission.reject',
        ],
        'hrd' => [
            'apps.*',
            'users.manage',
            'submission.second-approval',
            'submission.need-revision',
            'submission.reject',
        ],
        'pengesah' => [
            'apps.*',
            'submission.authenticator-approval',
        ],
        'pegawai' => [
            'apps.common',
            'submission.input',
            'submission.update',
        ],
    ];
}
