<?php

namespace App\Services;

class SubmissionService
{
  protected $client;
  protected $baseUrl;

  public function __construct()
  {
    $this->client = \Config\Services::curlrequest([
      'http_errors' => false,
    ]);
    $this->baseUrl = env("URL_SUBMISSION_SERVICE");
  }

  public function storeSubmission($data)
  {
    $response = $this->client->post($this->baseUrl . '/submissions', [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function sendSubmission($id)
  {
    $response = $this->client->put($this->baseUrl . "/submissions/$id/send");

    if ($response->getStatusCode() !== 200) {
      log_message('debug', 'SubmissionService::sendSubmission() succsee response: ' . json_encode($response));
      return json_decode($response->getBody());
    } else {
      log_message('debug', 'SubmissionService::sendSubmission() response: ' . json_encode($response));
      return json_decode($response->getBody());
    }
  }

  public function approvalAtasan($id, $data)
  {
    $response = $this->client->put($this->baseUrl . "/submissions/$id/approval-atasan", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function approvalHRD($id, $data)
  {
    $response = $this->client->put($this->baseUrl . "/submissions/$id/approval-hrd", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function uploadInvoice($id, $data)
  {
    $response = $this->client->post($this->baseUrl . "/submissions/$id/upload-invoice", [
      'headers' => [
        'Content-Type' => 'multipart/form-data',
      ],
      'multipart' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function approvalPengesah($id, $data)
  {
    $response = $this->client->put($this->baseUrl . "/submissions/$id/approval-pengesah", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function needRevision($id, $data)
  {

    log_message('info', 'id: ' . $id);
    
    $response = $this->client->put($this->baseUrl . "/submissions/$id/need-revision", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function update($id, $data)
  {
    $response = $this->client->put($this->baseUrl . "/submissions/$id", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function reject($id, $data)
  {
    $response = $this->client->put($this->baseUrl . "/submissions/$id/reject", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function getSubmissionById($id)
  {
    $response = $this->client->get($this->baseUrl . "/submissions/$id");

    return json_decode($response->getBody());
  }

  public function showByUser($id)
  {
    $response = $this->client->get($this->baseUrl . "/submissions/users/$id");

    return json_decode($response->getBody());
  }

  public function showItems($id)
  {
    $response = $this->client->get($this->baseUrl . "/submissions/$id/items");

    return json_decode($response->getBody());
  }

  public function storeItem($data)
  {
    $response = $this->client->post($this->baseUrl . "/submission-items", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function updateItem($id, $data)
  {
    $response = $this->client->put($this->baseUrl . "/submission-items/$id", [
      'json' => $data
    ]);

    return json_decode($response->getBody());
  }

  public function destroy($id)
  {
    $response = $this->client->delete($this->baseUrl . "/submissions/$id");

    return json_decode($response->getBody());
  }

  public function destroyItem($id)
  {
    $response = $this->client->delete($this->baseUrl . "/submission-items/$id");

    return json_decode($response->getBody());
  }

  public function showApproval($status)
  {
    $response = $this->client->get($this->baseUrl . "/submissions/approval/", [
      'json' => [
        'status' => $status
      ]
    ]);

    return json_decode($response->getBody());
  }
}
