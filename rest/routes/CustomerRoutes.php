<?php

// Route used to get all customers from db
Flight::route("GET /customers", function () {
    Flight::json(Flight::customerService()->getAll());
});

// Route used to get customer by id from db
Flight::route("GET /customers/@id", function ($id) {
    Flight::json(Flight::customerService()->getById($id));
});

// Route used to delete customer by id from db
Flight::route("DELETE /customers/@id", function ($id) {
    Flight::json(["message" => "Customer Deleted Succesfully", "data" => Flight::customerService()->delete($id)]);
});

// Route used to add customer to db
Flight::route("POST /customers/register", function () {
    Flight::json(["message" => "Customer registered Succesfully", "data" => Flight::customerService()->add(Flight::request()->data->getData())]);
});

Flight::route("POST /customers/login", function () {
    $data = Flight::request()->data->getData();

    // Check if we are getting the correct data
    error_log(json_encode($data)); // Check what data we are receiving

    // Check if email and password are provided
    if (!empty($data['email']) && !empty($data['password'])) {
        // Get customer by email from db
        $customer = Flight::customerService()->getByEmail($data['email']);
        error_log(json_encode($customer));

        // Verify the password   && password_verify($data['password'], $customer['password'])
        if ($customer && password_verify($data['password'], $customer['password'])) {
            Flight::json(["message" => "Customer Logged In Successfully"]);
        } else {
            Flight::json(["message" => "Invalid email or password"], 401);
        }
    } else {
        Flight::json(["message" => "Email and password are required"], 400);
    }
});
