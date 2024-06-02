<?php

// Parse the CLEARDB_DATABASE_URL provided by Heroku
$cleardb_url = parse_url(getenv('CLEARDB_DATABASE_URL'));

// Database connection
define('DB_HOST', $cleardb_url['host']);
define('DB_USERNAME', $cleardb_url['user']);
define('DB_PASSWORD', $cleardb_url['pass']);
define('DB_NAME', substr($cleardb_url['path'], 1)); // Remove the leading '/' from the path
define('DB_PORT', $cleardb_url['port']);

// JWT Token
define('JWT_SECRET', getenv('JWT_SECRET'));
