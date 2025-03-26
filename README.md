# Car Rental System

A car rental system built using React + Vite for the frontend, Node.js for the backend, and MySQL for the database. This system allows customers to browse available cars, book rentals, manage bookings, and more. Admins and rentals can manage users, cars, and bookings through an Admin and Rental dashboard.

## Features

- **User Authentication:** JWT-based authentication for users, with signup, login, and OTP email confirmation for signups.
- **Customer Dashboard:** Customers can view available cars, book and cancel rentals, and manage their profiles.
- **Admin Panel:** Admins can manage cars, users, and bookings.
- **Rental Dashboard:** Rentals can manage bookings and car status.
- **Database:** MySQL used to store user, car, and booking data.
- **Role-Based Access Control:** Three roles: Admin, Rental, and Customer.

## Tech Stack

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Email:** OTP-based email verification for user signup

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js
- MySQL
- npm or yarn

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/car-rental-system.git
   cd car-rental-system
2. Install dependencies:

    bash
    npm install

3. Start the development server:

    bash
    npm run dev
    Open your browser and go to http://localhost:3000 to view the frontend.

Backend Setup
Go to the backend directory:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the backend folder and add your database credentials and JWT secret:

env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=car_rental_db
JWT_SECRET=your-secret-key
Start the backend server:

bash
Copy
Edit
npm start
The backend will be running at http://localhost:5000.

Database Setup
Create a MySQL database car_rental_db or change the database name in the .env file.

Run the SQL queries provided in the backend/db/setup.sql to set up the necessary tables.

API Endpoints
POST /api/signup: User signup with OTP verification

POST /api/login: User login with JWT

GET /api/cars: Get list of available cars

POST /api/bookings: Create a new booking

GET /api/bookings: Get user bookings

DELETE /api/bookings/:id: Cancel a booking

GET /api/admin/cars: Get all cars (Admin)

POST /api/admin/cars: Add a new car (Admin)

PUT /api/admin/cars/:id: Update car details (Admin)

DELETE /api/admin/cars/:id: Delete a car (Admin)

Contributing
Feel free to fork the repository and submit pull requests for improvements or bug fixes.