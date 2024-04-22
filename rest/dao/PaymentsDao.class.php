<?php

require_once __DIR__ . "/BaseDao.class.php";

class PaymentsDao extends BaseDao
{
    // Class constructor used to establish connection to db
    public function __construct()
    {
        parent::__construct("payments");
    }
}
