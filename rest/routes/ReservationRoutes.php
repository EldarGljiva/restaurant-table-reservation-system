<?php

// Route used to get all reservations from db
/**
 * @OA\Get(
 *      path="/reservations",
 *      tags={"reservations"},
 *      summary="Get all reservations",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get all reservations"
 *      ),
 * )
 */
Flight::route("GET /reservations", function () {
    Flight::json(Flight::reservationService()->getAll());
});

// Route used to get reservation by id from db
/**
 * @OA\Get(
 *      path="/reservations/{id}",
 *      tags={"reservations"},
 *      summary="Get a reservation by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get a reservation by id"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Reservation ID"),
 * )
 */
Flight::route("GET /reservations/@email", function ($email) {
    Flight::json(Flight::reservationService()->getAllReservationsByEmail($email));
});

// Route used to get reservation by customer id from db
/**
 * @OA\Get(
 *      path="/reservations/customers/{email}",
 *      tags={"reservations"},
 *      summary="Get reservations by customer email",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get reservations by customer email"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="string"), in="path", name="email", example="customer@example.com", description="Customer Email"),
 * )
 */
Flight::route("GET /reservations/customers/@email", function ($email) {
    Flight::json(Flight::reservationService()->getAllBookingsById($email));
});

// Route used to delete reservation by id from db
/**
 * @OA\Delete(
 *      path="/reservations/{id}",
 *      tags={"reservations"},
 *      summary="Delete a reservation by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Deleted reservation data"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Reservation ID"),
 * )
 */
Flight::route("DELETE /reservations/@id", function ($id) {
    Flight::json(["message" => "reservation Deleted Succesfully", "data" => Flight::reservationService()->delete($id)]);
});

// Route used to add reservation to db
/**
 * @OA\Post(
 *      path="/reservations",
 *      tags={"reservations"},
 *      summary="Add a reservation",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          description="Reservation data payload",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(
 *                  property="customerId",
 *                  type="number",
 *                  example=1,
 *                  description="Customer ID"
 *              ),
 *              @OA\Property(
 *                  property="tableId",
 *                  type="number",
 *                  example=5,
 *                  description="Table ID"
 *              ),
 *              @OA\Property(
 *                  property="reservationDate",
 *                  type="string",
 *                  format="date-time",
 *                  example="2024-06-01T19:00:00Z",
 *                  description="Reservation Date and Time"
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Reservation added successfully"
 *      )
 * )
 */
Flight::route("POST /reservations", function () {
    Flight::json(["message" => "reservation added Succesfully", "data" => Flight::reservationService()->add(Flight::request()->data->getData())]);
});

// Route used to edit reservation from db
/**
 * @OA\Put(
 *      path="/reservations/{id}",
 *      tags={"reservations"},
 *      summary="Edit a reservation by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          description="Reservation data payload",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(
 *                  property="customerId",
 *                  type="number",
 *                  example=1,
 *                  description="Customer ID"
 *              ),
 *              @OA\Property(
 *                  property="tableId",
 *                  type="number",
 *                  example=5,
 *                  description="Table ID"
 *              ),
 *              @OA\Property(
 *                  property="reservationDate",
 *                  type="string",
 *                  format="date-time",
 *                  example="2024-06-01T19:00:00Z",
 *                  description="Reservation Date and Time"
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Reservation updated successfully"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Reservation ID"),
 * )
 */
Flight::route("PUT /reservations/@id", function ($id) {
    Flight::json(["message" => "reservation changed Successfully", "data" => Flight::reservationService()->update($id, Flight::request()->data->getData())]);
});
