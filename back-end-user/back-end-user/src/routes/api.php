<?php
// filepath: back-end-user/src/routes/api.php

require_once '../controllers/UserController.php';

$router = new Router();

// User routes
$router->post('/api/users', [UserController::class, 'createUser']);
$router->get('/api/users/{id}', [UserController::class, 'getUser']);
$router->put('/api/users/{id}', [UserController::class, 'updateUser']);
$router->delete('/api/users/{id}', [UserController::class, 'deleteUser']);

// Add more routes as needed

$router->run();
?>