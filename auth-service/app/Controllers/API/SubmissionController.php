<?php

namespace App\Controllers\API;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;

class SubmissionController extends BaseController
{
    use ResponseTrait;

    protected $submissionService;

    public function __construct()
    {
        $this->submissionService = \Config\Services::submissionServiceApi();
    }

    public function storeSubmission()
    {
        $data = $this->request->getJSON();

        $userId = auth()->user()->id;

        $response = $this->submissionService->storeSubmission([
            'request_user_id' => $userId,
            'year' => $data->year,
            'name' => $data->name,
            'submissionItems' => $data->submissionItems,
        ]);

        // log_message('debug', 'SubmissionController::storeSubmission() response: ' . json_encode($response));
        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respondCreated($response);
    }

    public function sendSubmission($id)
    {
        $response = $this->submissionService->sendSubmission($id);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function approvalAtasan($id)
    {
        $userId = auth()->user()->id;

        $response = $this->submissionService->approvalAtasan($id, [
            'approval_user_id' => $userId,
        ]);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function approvalHRD($id)
    {
        $userId = auth()->user()->id;

        $response = $this->submissionService->approvalHRD($id, [
            'approval_user_id' => $userId,
        ]);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function uploadInvoice($id)
    {
        if (!$this->request->getFile('invoice')) {
            return $this->fail('Invoice file is required', ResponseInterface::HTTP_BAD_REQUEST);
        }

        $file = $this->request->getFile('invoice');

        if (!$file->isValid()) {
            return $this->fail('File is not valid', ResponseInterface::HTTP_BAD_REQUEST);
        }

        $tempName = $file->getTempName();

        $data = [
            'invoice' => curl_file_create($tempName, $file->getMimeType(), $file->getName()),
        ];

        $response = $this->submissionService->uploadInvoice($id, $data);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function approvalPengesah($id)
    {
        $userId = auth()->user()->id;

        $response = $this->submissionService->approvalPengesah($id, [
            'approval_user_id' => $userId,
        ]);

        log_message('debug', 'SubmissionController::approvalPengesah() response: ' . json_encode($response));

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function needRevision($id)
    {
        $data = $this->request->getJSON();

        $userId = auth()->user()->id;

        $response = $this->submissionService->needRevision($id, [
            'reason_need_revision' => $data->reason,
            'need_revision_user_id' => $userId,
        ]);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function update($id)
    {
        $data = $this->request->getJSON();
        $response = $this->submissionService->update($id, $data);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function reject($id)
    {
        $data = $this->request->getJSON();
        $userId = auth()->user()->id;

        $response = $this->submissionService->reject($id, [
            'reason_rejected' => $data->reason,
            'rejected_user_id' => $userId,
        ]);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function destroy($id)
    {
        $response = $this->submissionService->destroy($id);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respondDeleted($response);
    }

    public function show($id)
    {
        $response = $this->submissionService->getSubmissionById($id);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function showByUser()
    {
        $userId = auth()->user()->id;
        $response = $this->submissionService->showByUser($userId);

        log_message('debug', 'SubmissionController::showByUser() response: ' . json_encode($response));

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function showItems($id)
    {
        $response = $this->submissionService->showItems($id);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function storeItem()
    {
        $data = $this->request->getJSON();
        $response = $this->submissionService->storeItem($data);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respondCreated($response);
    }

    public function updateItem($id)
    {
        $data = $this->request->getJSON();
        $response = $this->submissionService->updateItem($id, $data);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

    public function destroyItem($id)
    {
        $response = $this->submissionService->destroyItem($id);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respondDeleted($response);
    }

    public function showApproval()
    {
        $data = $this->request->getJSON();

        log_message('debug', 'SubmissionController::showApproval() data: ' . json_encode($data));

        $group = $data->group;

        switch ($group) {
            case 'atasan':
                $status = 2;
                break;
            case 'hrd':
                $status = 3;
                break;
            case 'pengesah':
                $status = 5;
                break;
            default:
                return $this->fail('Invalid status', ResponseInterface::HTTP_BAD_REQUEST);
        }

        log_message('debug', 'SubmissionController::showApproval() status: ' . $status);

        $response = $this->submissionService->showApproval($status);

        if (!$response->status === 200) {
            return $this->fail($response, $response->status);
        }

        return $this->respond($response);
    }

}
