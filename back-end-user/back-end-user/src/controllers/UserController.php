<?php

class UserController {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function createUser($data) {
        // Logic to create a new user
        return $this->userModel->save($data);
    }

    public function getUser($id) {
        // Logic to retrieve a user by ID
        return $this->userModel->find($id);
    }

    public function updateUser($id, $data) {
        // Logic to update an existing user
        return $this->userModel->update($id, $data);
    }

    public function deleteUser($id) {
        // Logic to delete a user
        return $this->userModel->delete($id);
    }
}