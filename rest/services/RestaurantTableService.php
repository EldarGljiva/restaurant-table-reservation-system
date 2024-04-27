<?php

require_once "BaseService.php";
require __DIR__ . '/../dao/RestaurantTablesDao.class.php';

class RestaurantTableService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new RestaurantTablesDao);
    }
}
