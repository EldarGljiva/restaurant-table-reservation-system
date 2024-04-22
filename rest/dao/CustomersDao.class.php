<?php

require_once __DIR__ . "/BaseDao.class.php";

class CustomersDao extends BaseDao
{
  // Class constructor used to establish connection to db
  public function __construct()
  {
    parent::__construct("customers");
  }


  // Override add method to hash password
  public function add($customer)
  {
    // Hash the password using password_hash()
    $hashedPassword = password_hash($customer['password'], PASSWORD_DEFAULT);

    // Replace the plain password with the hashed password
    $customer['password'] = $hashedPassword;
    $customer['role'] = 'customer';

    // Call the parent add method
    return parent::add($customer);
  }






  // Function to get Customer by email
  // SHOULD USE THIS BUT DOESN'T WOKR YET
  /*public function getByEmail($email)
{
    return $this->query("SELECT * FROM customer WHERE email = :email", ["email" => $email]);
  }*/
}
