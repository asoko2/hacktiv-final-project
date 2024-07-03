<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Forge;
use CodeIgniter\Database\Migration;

class AddNipColumnToUsers extends Migration
{
    /**
     * @var string[]
     */
    private array $tables;

    public function __construct(?Forge $forge = null)
    {
        parent::__construct($forge);

        /** @var \Config\Auth $authConfig */
        $authConfig = config('Auth');
        $this->tables = $authConfig->tables;
    }
    public function up()
    {
        $fields = [
            'nip' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
        ];

        $this->forge->addColumn($this->tables['users'], $fields);

    }

    public function down()
    {
        $this->forge->dropColumn($this->tables['users'], ['nip', 'name']);
    }
}
