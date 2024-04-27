<?php

// Route used to get all tables of restaurant from db
Flight::route("GET /restauranttables", function () {
    Flight::json(Flight::restauranttableService()->getAll());
});

// Route used to get menu items by id from db
Flight::route("GET /restauranttable/@id", function ($id) {
    Flight::json(Flight::restauranttableService()->getById($id));
});

// Route used to delete restauranttable by id from db
Flight::route("DELETE /restauranttables/@id", function ($id) {
    Flight::json(["message" => "restauranttable Deleted Succesfully", "data" => Flight::restauranttableService()->delete($id)]);
});

// Route used to add restauranttable to db
Flight::route("POST /restauranttables", function () {
    Flight::json(["message" => "restauranttable added Succesfully", "data" => Flight::restauranttableService()->add(Flight::request()->data->getData())]);
});

// Route used to edit restauranttable from db
Flight::route("PUT /restauranttables/@id", function ($id) {
    Flight::json(["message" => "restauranttable changed Successfully", "data" => Flight::restauranttableService()->update($id, Flight::request()->data->getData())]);
});
