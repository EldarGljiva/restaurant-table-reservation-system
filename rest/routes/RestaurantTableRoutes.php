<?php

// Route used to get all tables of restaurant from db
/**
 * @OA\Get(
 *      path="/restauranttables",
 *      tags={"restauranttables"},
 *      summary="Get all restaurant tables",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get all restaurant tables"
 *      ),
 * )
 */
Flight::route("GET /restauranttables", function () {
    Flight::json(Flight::restauranttableService()->getAll());
});

// Route used to get menu items by id from db
/**
 * @OA\Get(
 *      path="/restauranttable/{id}",
 *      tags={"restauranttables"},
 *      summary="Get a restaurant table by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get a restaurant table by id"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Restaurant Table ID"),
 * )
 */
Flight::route("GET /restauranttable/@id", function ($id) {
    Flight::json(Flight::restauranttableService()->getById($id));
});

// Route used to delete restauranttable by id from db
/**
 * @OA\Delete(
 *      path="/restauranttables/{id}",
 *      tags={"restauranttables"},
 *      summary="Delete a restaurant table by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Deleted restaurant table data"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Restaurant Table ID"),
 * )
 */
Flight::route("DELETE /restauranttables/@id", function ($id) {
    Flight::json(["message" => "restauranttable Deleted Succesfully", "data" => Flight::restauranttableService()->delete($id)]);
});

// Route used to add restauranttable to db
/**
 * @OA\Post(
 *      path="/restauranttables",
 *      tags={"restauranttables"},
 *      summary="Add a restaurant table",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          description="Restaurant table data payload",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(
 *                  property="tableNumber",
 *                  type="number",
 *                  example=1,
 *                  description="Table number"
 *              ),
 *              @OA\Property(
 *                  property="numberOfSeats",
 *                  type="number",
 *                  example=4,
 *                  description="Number of seats"
 *              ),
 *              @OA\Property(
 *                  property="reserved",
 *                  type="boolean",
 *                  example=0,
 *                  description="Reservation status"
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Restaurant table added successfully"
 *      )
 * )
 */
Flight::route("POST /restauranttables", function () {
    Flight::json(["message" => "restauranttable added Succesfully", "data" => Flight::restauranttableService()->add(Flight::request()->data->getData())]);
});

// Route used to edit restauranttable from db
/**
 * @OA\Put(
 *      path="/restauranttables/{id}",
 *      tags={"restauranttables"},
 *      summary="Edit a restaurant table by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          description="Restaurant table data payload",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(
 *                  property="tableNumber",
 *                  type="number",
 *                  example=1,
 *                  description="Table number"
 *              ),
 *              @OA\Property(
 *                  property="numberOfSeats",
 *                  type="number",
 *                  example=4,
 *                  description="Number of seats"
 *              ),
 *              @OA\Property(
 *                  property="reserved",
 *                  type="boolean",
 *                  example=0,
 *                  description="Reservation status"
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Restaurant table updated successfully"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Restaurant Table ID"),
 * )
 */
Flight::route("PUT /restauranttables/@id", function ($id) {
    Flight::json(["message" => "restauranttable changed Successfully", "data" => Flight::restauranttableService()->update($id, Flight::request()->data->getData())]);
});
