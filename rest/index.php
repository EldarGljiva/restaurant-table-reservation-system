<?php

// Include flightPHP
require "../vendor/autoload.php";

// Require all service files
require "services/CustomerService.php";
require "services/MenuItemsService.php";
require "services/RestaurantTableService.php";
require "services/ReservationService.php";
require "services/PaymentService.php";

// Register services with Flight
Flight::register("customerService", "CustomerService");
Flight::register("menuitemsService", "MenuItemsService");
Flight::register("restauranttableService", "RestaurantTableService");
Flight::register("reservationService", "ReservationService");
Flight::register("paymentService", "PaymentService");

// Require all route files
require_once("routes/CustomerRoutes.php");
require_once("routes/MenuItemsRoutes.php");
require_once("routes/RestaurantTableRoutes.php");
require_once("routes/ReservationRoutes.php");
require_once("routes/PaymentRoutes.php");

// Default route
Flight::route("/", function () {
    echo "Hello from / route";
});

Flight::start();
