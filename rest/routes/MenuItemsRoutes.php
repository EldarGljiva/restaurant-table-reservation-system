<?php

// Route used to get all items of menu from db
// Route used to get all menu items from db
/**
 * @OA\Get(
 *      path="/menuitems",
 *      tags={"menuitems"},
 *      summary="Get all menu items",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get all menu items"
 *      ),
 * )
 */
Flight::route("GET /menuitems", function () {
    Flight::json(Flight::menuitemsService()->getAll());
});

// Route used to get menu items by id from db
// Route used to get menu items by id from db
/**
 * @OA\Get(
 *      path="/menuitems/{id}",
 *      tags={"menuitems"},
 *      summary="Get a menu item by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Get a menu item by id"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Menu Item ID"),
 * )
 */
Flight::route("GET /menuitems/@id", function ($id) {
    Flight::json(Flight::menuitemsService()->getById($id));
});

// Route used to delete menuitems by id from db
/**
 * @OA\Delete(
 *      path="/menuitems/{id}",
 *      tags={"menuitems"},
 *      summary="Delete a menu item by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Deleted menu item data"
 *      ),
 *   @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Menu Item ID"),
 * )
 */
Flight::route("DELETE /menuitems/@id", function ($id) {
    Flight::json(["message" => "menuitems Deleted Succesfully", "data" => Flight::menuitemsService()->delete($id)]);
});

// Route used to add menuitems to db
/**
 * @OA\Post(
 *      path="/menuitems",
 *      tags={"menuitems"},
 *      summary="Add a menu item",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          description="Menu item data payload",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(
 *                  property="foodName",
 *                  type="string",
 *                  example="Burger",
 *                  description="Menu item name"
 *              ),
 *              @OA\Property(
 *                  property="foodPrice",
 *                  type="number",
 *                  example=5.99,
 *                  description="Menu item price"
 *              ),
 *              @OA\Property(
 *                  property="foodType",
 *                  type="string",
 *                  example="Main Courses",
 *                  description="Type of food"
 *              ),
 *              @OA\Property(
 *                  property="description",
 *                  type="string",
 *                  example="Delicious beef burger",
 *                  description="Menu item description"
 *              ),
 *              @OA\Property(
 *                  property="image_url",
 *                  type="string",
 *                  example="assets/images/food1.jpg",
 *                  description="URL of the image"
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Menu item added successfully"
 *      )
 * )
 */
Flight::route("POST /menuitems", function () {
    Flight::json(["message" => "menuitems added Succesfully", "data" => Flight::menuitemsService()->add(Flight::request()->data->getData())]);
});

// Route used to edit menuitems from db
/**
 * @OA\Put(
 *      path="/menuitems/{id}",
 *      tags={"menuitems"},
 *      summary="Edit a menu item by id",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          description="Menu item data payload",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(
 *                  property="foodName",
 *                  type="string",
 *                  example="Burger",
 *                  description="Menu item name"
 *              ),
 *              @OA\Property(
 *                  property="foodPrice",
 *                  type="number",
 *                  example=5.99,
 *                  description="Menu item price"
 *              ),
 *              @OA\Property(
 *                  property="foodType",
 *                  type="string",
 *                  example="Main Courses",
 *                  description="Type of food"
 *              ),
 *              @OA\Property(
 *                  property="description",
 *                  type="string",
 *                  example="Edited delicious beef burger",
 *                  description="Menu item description"
 *              ),
 *              @OA\Property(
 *                  property="image_url",
 *                  type="string",
 *                  example="assets/images/food1.jpg",
 *                  description="URL of the image"
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Menu item updated successfully"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Menu Item ID"),
 * )
 */
Flight::route("PUT /menuitems/@id", function ($id) {
    Flight::json(["message" => "menuitems changed Successfully", "data" => Flight::menuitemsService()->update($id, Flight::request()->data->getData())]);
});
