# NowTutors

NowTutors is a web application built using **React** (with **TypeScript**), **Inertia.js**, and a **Laravel** backend. The project is designed to provide a platform where students can register and find tutors, and tutors can offer their services.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login (authentication)
- User roles: Student and Tutor
- Student and Tutor dashboards
- Profile management for both user types
- Third-party authentication (Google, Twitter, Discord)
- Responsive UI built with React and Tailwind CSS
- API routes for communication between frontend and backend

## Technologies

- **Frontend**:
  - React (with TypeScript)
  - Inertia.js (for seamless page transitions)
  - Tailwind CSS (for responsive design)
  
- **Backend**:
  - Laravel (PHP framework)
  - Inertia.js (for API-driven SPA)
  - MySQL (or other databases)
  
- **Additional Tools**:
  - Vite (for frontend asset bundling)
  - Git (for version control)
  - Composer (for Laravel dependencies)
  - Node.js & Yarn (for frontend dependencies)

## Requirements

Before installing and running the project, ensure you have the following installed:

- **PHP 8.x** or higher
- **Composer** (PHP package manager)
- **Node.js** (v14.x or higher)
- **Yarn** (instead of npm)
- **MySQL** (or another database supported by Laravel)
- **Git**

## Installation

Follow these steps to install and run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nowtutors.git
cd nowtutors
```

### 2. Install Backend Dependencies
```bash
composer install
```

### 3. Install Frontend Dependencies
```bash
yarn install
```

### 4. Set up the `.env` file

Copy the example environment file and update the settings as needed:

```bash
cp .env.example .env
```

Make sure to set your database credentials, application URL, and other necessary environment variables.

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Migrate the Database
Make sure your database connection is properly configured in your `.env` file, then run:

```bash
php artisan migrate
```

### 7. Build the Frontend Assets
```bash
yarn dev
```

To build assets for production, run:

```bash
yarn build
```

## Environment Variables

Below is a list of key environment variables you'll need to set in your `.env` file:

```bash
APP_NAME=NowTutors
APP_ENV=local
APP_KEY=base64:...
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nowtutors
DB_USERNAME=root
DB_PASSWORD=

# Inertia
INERTIA_VERSION=...

# Other services like Google, Twitter, Discord for third-party auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

Make sure to replace the placeholders with actual values.

## Running the Project

After completing the setup, run the following commands to start the development server:

### 1. Start Laravel Backend
```bash
php artisan serve
```

This will start the Laravel server at `http://127.0.0.1:8000`.

### 2. Start the Frontend Development Server
```bash
yarn dev
```

By default, Vite will run the frontend at `http://localhost:3000`.

You can now access the application in your browser by visiting `http://127.0.0.1:8000`.

## Contributing

Contributions are welcome! If you’d like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

Please ensure that your code follows the project’s coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.