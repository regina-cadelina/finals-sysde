# Back-End User Project

This project is a PHP-based backend application designed to handle user-related actions for the Isabelle Concept & Prints website. It provides a RESTful API for managing users, including creating, retrieving, updating, and deleting user information.

## Project Structure

```
back-end-user
├── public
│   └── index.php          # Entry point for the application
├── src
│   ├── controllers
│   │   └── UserController.php  # Handles user-related actions
│   ├── models
│   │   └── User.php      # Represents the user model
│   ├── routes
│   │   └── api.php       # API routes for user actions
│   └── config
│       └── database.php   # Database configuration settings
├── composer.json          # Composer dependencies and autoloading
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the Repository**: 
   Clone this repository to your local machine using:
   ```
   git clone <repository-url>
   ```

2. **Install Dependencies**: 
   Navigate to the project directory and run:
   ```
   composer install
   ```

3. **Configure Database**: 
   Open `src/config/database.php` and update the database connection parameters (host, username, password, database name) to match your local setup.

4. **Run the Application**: 
   You can run the application using a local server such as XAMPP or by using PHP's built-in server:
   ```
   php -S localhost:8000 -t public
   ```

## Usage

- The API endpoints are defined in `src/routes/api.php`. You can access them via the base URL followed by the route path.
- Use tools like Postman or cURL to interact with the API.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.