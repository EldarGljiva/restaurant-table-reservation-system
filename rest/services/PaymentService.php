<?php

require_once "BaseService.php";
require __DIR__ . '/../dao/PaymentsDao.class.php';

class PaymentService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new PaymentsDao);
    }
}
