<?php

require __DIR__ . "/../../config.php";

class BaseDao
{
    private $conn;
    private $table_name;

    // Class constructor used to establish connection to db
    public function __construct($table_name)
    {
        $this->table_name = $table_name;
        try {
            $this->conn = new PDO(
                "mysql:host=" . Config::DB_HOST() . ";port=" . Config::DB_PORT() . ";dbname=" . Config::DB_NAME(),
                Config::DB_USERNAME(),
                Config::DB_PASSWORD(),
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }


    protected function getConnection()
    {
        return $this->conn;
    }

    // Method used to get all entities from db
    public function getAll()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Method used to get entity by id
    public function getById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name . " WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    // Method used to delete entity from db
    public function delete($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table_name .  " WHERE id =?");
        $stmt->execute([$id]);
    }

    // Method used to add entity to db
    public function add($entity)
    {

        $query = "INSERT INTO " . $this->table_name . " (";
        foreach ($entity as $column => $value) {
            $query .= $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES(";
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ")";

        $stmt = $this->conn->prepare($query);
        $stmt->execute($entity);
        $entity['id'] = $this->conn->lastInsertId();
        return $entity;
    }

    // Method to update entity from db
    public function update($id, $entity)
    {
        $query = "UPDATE " . $this->table_name . " SET ";
        foreach ($entity as $column => $value) {
            $query .= $column . "=:" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE id = :id";
        $entity['id'] = $id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute($entity);
        return $entity;
    }

    // Method used to get entity by id
    public function getByEmail($email)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name . " WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }


    // Query method
    public function query($query, $params)
    {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
