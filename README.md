# CarRentalSystem# Car Rental System

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