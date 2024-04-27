<?php

require_once "BaseService.php";
require __DIR__ . '/../dao/CustomersDao.class.php';

class CustomerService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new CustomersDao);
    }


    public function add($entity)
    {
        //$entity['password'] = md5($entity['password']);
        return parent::add($entity);
    }
}
