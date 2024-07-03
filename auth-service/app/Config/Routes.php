<?php

use App\Controllers\API\SubmissionController;
use App\Controllers\AuthController;
use App\Controllers\UserController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->group('api', function ($routes) {

  $routes->post('login', [AuthController::class, 'login']);

  $routes->group('', ['filter' => ['jwt', 'blacklistedToken']], function ($routes) {

    $routes->group('auth', function ($routes) {
      $routes->get('profile', [AuthController::class, 'getProfile']);
      $routes->get('logout', [AuthController::class, 'logout']);
      $routes->get('submissions', [SubmissionController::class, 'showByUser']);
    });

    $routes->group('submissions', function ($routes) {

      $routes->post('', [SubmissionController::class, 'storeSubmission']);
      $routes->get('(:segment)', [SubmissionController::class, 'show/$1']);
      $routes->get('(:segment)/items', [SubmissionController::class, 'showItems/$1']);
      $routes->delete('(:segment)', [SubmissionController::class, 'destroy/$1']);

      $routes->put('(:segment)/approval-atasan', [SubmissionController::class, 'approvalAtasan/$1']);
      $routes->put('(:segment)/approval-hrd', [SubmissionController::class, 'approvalHRD/$1']);
      $routes->put('(:segment)/approval-pengesah', [SubmissionController::class, 'approvalPengesah/$1']);

      $routes->put('(:segment)/need-revision', [SubmissionController::class, 'needRevision/$1']);
      $routes->put('(:segment)', [SubmissionController::class, 'update/$1']);

      $routes->put('(:segment)/reject', [SubmissionController::class, 'reject/$1']);

      $routes->post('(:segment)/upload-invoice', [SubmissionController::class, 'uploadInvoice/$1']);
    });

    $routes->group('submission-items', function ($routes) {
      $routes->post('', [SubmissionController::class, 'storeItem']);
      $routes->put('(:segment)', [SubmissionController::class, 'updateItem/$1']);
      $routes->delete('(:segment)', [SubmissionController::class, 'deleteItem/$1']);
    });

    $routes->group('users', function ($routes) {
      $routes->get('', [UserController::class, 'getAllUser']);
      $routes->post('', [UserController::class, 'store']);
      $routes->get('groups', [UserController::class, 'getUserWithGroup']);

      $routes->get('(:segment)', [UserController::class, 'show/$1']);
      $routes->put('(:segment)', [UserController::class, 'update/$1']);
      $routes->delete('(:segment)', [UserController::class, 'delete/$1']);
      $routes->post('(:segment)/sync-group', [UserController::class, 'syncGroup/$1']);

    });
  });
});
