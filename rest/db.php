<?php

require "dao/BaseDao.class.php";

$testing = new BaseDao("customers");
print_r($testing->getAll());
