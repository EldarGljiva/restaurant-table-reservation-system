<?php

require_once "BaseService.php";
require __DIR__ . '/../dao/MenuItemsDao.class.php';

class MenuItemsService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new MenuItemsDao);
    }
}
