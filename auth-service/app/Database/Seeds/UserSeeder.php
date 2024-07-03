<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\Shield\Entities\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = auth()->getProvider();

        $user = new User([
            'nip' => '1234',
            'username' => 'hrd',
            'name' => 'HRD',
            'email' => 'hrd@gmail.com',
            'password' => '12341234',
        ]);
        $users->save($user);

        $user = $users->findById($users->getInsertID());

        $users->addToDefaultGroup($user);
        $user->addGroup('hrd', 'pegawai');
        $user->addPermission('apps.common', 'users.manage', 'submission.second-approval', 'submission.need-revision', 'submission.reject');
    }
}
