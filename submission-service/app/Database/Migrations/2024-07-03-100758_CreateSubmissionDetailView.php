<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSubmissionDetailView extends Migration
{
    public function up()
    {
        $this->db->query("
            CREATE VIEW submission_detail AS
            SELECT
                submissions.*,
                submission_status.status_name AS status_name,
                submission_status.status_code AS status_code,
                requester.name AS request_user_name,
                approval_atasan.name as atasan_name,
                approval_hrd.name as hrd_name,
                authenticator.name as authenticator_name,
                need_revision.name as need_revision_name,
                rejector.name as rejector_name
            FROM
                submissions
                LEFT JOIN submission_status ON submission_status.id = submissions.status
                LEFT JOIN users AS requester ON requester.id = submissions.request_user_id
                LEFT JOIN users AS approval_atasan ON approval_atasan.id = submissions.approval_one_user_id
                LEFT JOIN users AS approval_hrd ON approval_hrd.id = submissions.approval_two_user_id
                LEFT JOIN users AS authenticator ON authenticator.id = submissions.authenticator_user_id
                LEFT JOIN users AS need_revision ON need_revision.id = submissions.need_revision_user_id
                LEFT JOIN users AS rejector ON rejector.id = submissions.rejected_user_id
            ORDER BY
                status ASC,
                id ASC
        ");
    }

    public function down()
    {
        $this->db->query("DROP VIEW submission_detail");
    }
}
