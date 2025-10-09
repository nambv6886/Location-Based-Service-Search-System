# Location-Based Service Search System

A robust and scalable location-based service search system built with NestJS, TypeORM, and MySQL. This system enables users to search for nearby stores and services based on their geographical location with advanced filtering and favorites management.

## 🚀 Live Demo

The application is deployed and accessible at:
**[http://18.138.51.60:3000/api/docs](http://18.138.51.60:3000/api/docs)**

## ✨ Features

- **User Authentication & Authorization**
  - JWT-based authentication with access and refresh tokens
  - Secure password management with bcrypt
  - Password reset functionality via email
  - Token invalidation and session management

- **Location-Based Search**
  - Search stores by user's current location
  - Radius-based filtering
  - Distance calculation and sorting
  - Store category filtering

- **User Favorites**
  - Save favorite stores
  - Manage favorite lists
  - Quick access to preferred locations

- **Store Management**
  - CRUD operations for stores
  - Store categorization
  - Geolocation data storage
  - Advanced search and filtering

- **Security Features**
  - Rate limiting with throttling
  - Helmet for HTTP security headers
  - CORS enabled
  - Password encryption
  - JWT token management

- **API Documentation**
  - Interactive Swagger/OpenAPI documentation
  - Bearer token authentication support
  - Request/response examples

## 🛠️ Tech Stack

- **Framework:** NestJS v11
- **Language:** TypeScript
- **Database:** MySQL 8.0
- **ORM:** TypeORM
- **Cache:** Redis Stack
- **Authentication:** JWT (Passport)
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest
- **Containerization:** Docker & Docker Compose

## 📋 Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MySQL >= 8.0
- Redis >= 7.x
- Docker & Docker Compose (for containerized deployment)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Location-Based-Service-Search-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory by copying the example file:

```bash
cp example.env .env
```

Configure the following environment variables:

```env
# Database Configuration
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=nestjs_dev

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET_KEY=your_secret_key_here
JWT_ACCESS_TOKEN_EXPIRES_TIME=15m
JWT_REFRESH_TOKEN_EXPIRES_TIME=7d

# Password Reset Configuration
FORGOT_PASSWORD_WAIT_TIME_IN_SECONDS=300
PASSWORD_RESET_TOKEN_LIFE_TIME_IN_SECONDS=3600

# Application URL
BASE_URL=http://localhost:3000

# Email Configuration
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_USER_NAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_RESET_PASSWORD_SUBJECT=Reset Your Password

# Seeder Configuration
RUN_SEEDER=false
```

## 🚀 Running the Application

### Development Mode

```bash
# Standard development mode
npm run start:dev

# With database seeding
npm run start:dev:seed
```

### Production Mode

```bash
# Build the application
npm run build

# Run in production mode
npm run start:prod
```

### Using Docker

```bash
# Start all services (app, MySQL, Redis)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

The application will be available at `http://localhost:3000`

API Documentation will be available at `http://localhost:3000/api/docs`

## 🗄️ Database Management

### Running Migrations

```bash
# Run all pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

### Creating Migrations

```bash
# Generate a migration from entity changes
npm run migration:generate --name=YourMigrationName

# Create an empty migration file
npm run migration:create --name=YourMigrationName
```

### Database Seeding

The application includes a seeder service that can populate the database with initial data. Enable it by setting `RUN_SEEDER=true` in your `.env` file or run:

```bash
npm run start:seed
```

Default seeded users:
- `admin@example.com` (password: `password123`)
- `user1@example.com` (password: `password123`)

## 📚 API Documentation

Interactive API documentation is available via Swagger UI:

- **Local:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Production:** [http://18.138.51.60:3000/api/docs](http://18.138.51.60:3000/api/docs)

### Authentication

Most endpoints require JWT authentication. To authenticate:

1. Register a new user via `/auth/register` or use seeded credentials
2. Login via `/auth/login` to get an access token
3. Click the "Authorize" button in Swagger UI
4. Enter: `Bearer <your_access_token>`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 📁 Project Structure

```
src/
├── app.module.ts              # Root application module
├── main.ts                    # Application entry point
├── common/                    # Shared utilities and constants
│   ├── constants/            # Application constants
│   ├── filters/              # Exception filters
│   ├── guards/               # Authentication guards
│   ├── interceptors/         # Request/response interceptors
│   └── utils/                # Helper utilities
├── config/                    # Configuration files
│   ├── config.service.ts     # Environment configuration
│   └── typeorm.config.ts     # TypeORM configuration
├── migrations/                # Database migrations
├── models/                    # Shared models and interfaces
│   ├── interfaces/           # TypeScript interfaces
│   └── pagination/           # Pagination models
└── modules/                   # Feature modules
    ├── auth/                 # Authentication & authorization
    ├── seeder/               # Database seeding
    ├── shared/               # Shared services (email, etc.)
    ├── stores/               # Store management
    ├── user-current-location/ # User location tracking
    ├── user-favorites/       # Favorites management
    ├── user-token/           # Token management
    └── users/                # User management
```

## 🐳 Docker Configuration

The project includes Docker support with:

- **Multi-stage builds** for optimized image size
- **Docker Compose** orchestration for app, MySQL, and Redis
- **Volume persistence** for database and cache data
- **Network isolation** with custom bridge network
- **Health checks** and automatic restarts

### Container Details

- **app-lds:** Main NestJS application (Port 3000)
- **mysql-lds:** MySQL 8.0 database (Port 3306)
- **redis-lds:** Redis Stack Server (Port 6379)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under UNLICENSED.

## 👤 Author

Built as part of an assignment project.

## 📧 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Happy Coding! 🎉**

