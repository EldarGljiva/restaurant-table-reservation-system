<?php

require_once __DIR__ . "/BaseDao.class.php";

class ReservationsDao extends BaseDao
{
    // Class constructor used to establish connection to db
    public function __construct()
    {
        parent::__construct("reservations");
    }


    // Override getById method to display all bookings with customer id 
    public function getAllReservationsById($email)
    {
        $id = $this->getCustomerIdByEmail($email);
        $conn = $this->getConnection();
        $stmt = $conn->prepare("SELECT * FROM reservations WHERE customerId = ?");
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // Override the add method for specific behavior related to bookings
    public function add($entity)
    {
        // For example, retrieving customerId and tableId
        $customerId = $this->getCustomerIdByEmail($entity['email']);
        $tableId = $this->getTableIdByNumber($entity['table']);

        // Modify the entity before passing it to parent add method
        $reservation['customerId'] = $customerId;
        $reservation['tableId'] = $tableId;
        $reservation['reservationDate'] = $entity['reservationDate'];

        // Call parent add method to insert into database
        return parent::add($reservation);
    }

    // Additional methods specific to BookingsDao
    private function getCustomerIdByEmail($email)
    {
        $conn = $this->getConnection();
        $stmt = $conn->prepare("SELECT id FROM customers WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetchColumn(); // fetchColumn() gets us a single value
    }

    private function getTableIdByNumber($tableNumber)
    {
        $conn = $this->getConnection();
        $stmt = $conn->prepare("SELECT id FROM restauranttables WHERE tableNumber = ?");
        $stmt->execute([$tableNumber]);
        return $stmt->fetchColumn();
    }
}
