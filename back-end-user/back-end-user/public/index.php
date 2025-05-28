<?php
// public/index.php

// Load Composer's autoloader
require_once '../vendor/autoload.php';

// Load configuration
require_once '../src/config/database.php';

// Initialize the application
$app = new \Slim\App;

// Include routes
require_once '../src/routes/api.php';

// Run the application
$app->run();
?>