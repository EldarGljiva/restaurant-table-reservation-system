<?php

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

Flight::route('/*', function () {


    if (strpos(Flight::request()->url, '/customers/login') === 0 || strpos(Flight::request()->url, '/customers/register') === 0) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader('Authentication');
            if (!$token) {
                Flight::halt(401, "Missing authentification token");
            } else {

                $decoded_token = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));

                Flight::set('customer', $decoded_token->customer);
                Flight::set('token', $token);
                return TRUE;
            }
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});
