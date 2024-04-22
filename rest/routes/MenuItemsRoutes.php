<?php

// Route used to get all items of menu from db
Flight::route("GET /menuitems", function () {
    Flight::json(Flight::menuitemsService()->getAll());
});

// Route used to get menu items by id from db
Flight::route("GET /menuitems/@id", function ($id) {
    Flight::json(Flight::menuitemsService()->getById($id));
});

// Route used to delete menuitems by id from db
Flight::route("DELETE /menuitems/@id", function ($id) {
    Flight::json(["message" => "menuitems Deleted Succesfully", "data" => Flight::menuitemsService()->delete($id)]);
});

// Route used to add menuitems to db
Flight::route("POST /menuitems", function () {
    Flight::json(["message" => "menuitems added Succesfully", "data" => Flight::menuitemsService()->add(Flight::request()->data->getData())]);
});

// Route used to edit menuitems from db
Flight::route("PUT /menuitems/@id", function ($id) {
    Flight::json(["message" => "menuitems changed Successfully", "data" => Flight::menuitemsService()->update($id, Flight::request()->data->getData())]);
});
