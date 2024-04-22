<?php

// Route used to get all payments from db
Flight::route("GET /payments", function () {
    Flight::json(Flight::paymentService()->getAll());
});

// Route used to get payment by id from db
Flight::route("GET /payments/@id", function ($id) {
    Flight::json(Flight::paymentService()->getById($id));
});

// Route used to delete payment by id from db
Flight::route("DELETE /payments/@id", function ($id) {
    Flight::json(["message" => "payment Deleted Succesfully", "data" => Flight::paymentService()->delete($id)]);
});

// Route used to add payment to db
Flight::route("POST /payments", function () {
    Flight::json(["message" => "payment added Succesfully", "data" => Flight::paymentService()->add(Flight::request()->data->getData())]);
});

// Route used to edit payment from db
Flight::route("PUT /payments/@id", function ($id) {
    Flight::json(["message" => "payment changed Successfully", "data" => Flight::paymentService()->update($id, Flight::request()->data->getData())]);
});
