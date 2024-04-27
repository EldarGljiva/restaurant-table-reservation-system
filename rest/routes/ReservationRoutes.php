<?php

// Route used to get all reservations from db
Flight::route("GET /reservations", function () {
    Flight::json(Flight::reservationService()->getAll());
});

// Route used to get reservation by id from db
Flight::route("GET /reservations/@id", function ($id) {
    Flight::json(Flight::reservationService()->getById($id));
});

// Route used to get reservation by customer id from db
Flight::route("GET /reservations/customers/@email", function ($email) {
    Flight::json(Flight::reservationService()->getAllBookingsById($email));
});

// Route used to delete reservation by id from db
Flight::route("DELETE /reservations/@id", function ($id) {
    Flight::json(["message" => "reservation Deleted Succesfully", "data" => Flight::reservationService()->delete($id)]);
});

// Route used to add reservation to db
Flight::route("POST /reservations", function () {
    Flight::json(["message" => "reservation added Succesfully", "data" => Flight::reservationService()->add(Flight::request()->data->getData())]);
});

// Route used to edit reservation from db
Flight::route("PUT /reservations/@id", function ($id) {
    Flight::json(["message" => "reservation changed Successfully", "data" => Flight::reservationService()->update($id, Flight::request()->data->getData())]);
});
