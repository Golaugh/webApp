# Colin's Bookstore

A web-based bookstore application developed as part of Virginia Tech's Web Application Development course. This e-commerce platform allows users to browse and purchase books across different categories like Best Sellers, New Releases, and Top Rated selections.

The application features a modern, responsive interface where customers can:
- Browse books by category
- Add books to their shopping cart
- Manage cart quantities
- Complete purchases through a secure checkout process

This project is a modern web-based bookstore application built with React frontend and Java REST API backend. It provides a seamless shopping experience with features like category browsing, cart management, and secure checkout process.

## Key Features

- **Category-based Book Browsing**: Users can browse books organized by categories
- **Shopping Cart Management**: 
  - Add/remove books from cart
  - Adjust quantities
  - Persistent cart data
- **Checkout Process**:
  - Customer information collection
  - Credit card validation
  - Order confirmation
- **Responsive Design**: Works across different screen sizes
- **Real-time Price Calculations**: Automatic cart total and tax calculations

## Technical Stack

### Frontend
- React.js
- TypeScript
- React Router for navigation
- Context API for state management
- CSS for styling

### Backend
- Java
- Jakarta EE
- JAX-RS (Jersey) for REST API
- MySQL Database
- JDBC for database access
- Gradle for build management

### Key Dependencies
- Frontend:
  - `react-router-dom`
  - `@fortawesome/fontawesome-free`
  - `axios` for HTTP requests

- Backend:
  - `jersey-container-servlet`
  - `jersey-media-json-jackson`
  - `mysql-connector-java`
  - Jackson libraries for JSON processing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java JDK 17
- MySQL Server
- Gradle

### Setting Up the Database
1. Install MySQL Server
2. Create a new database named `JianwenBookstore`
3. Configure the database connection in server's configuration

### Starting the Backend
```bash
cd server
gradle clean build
gradle appRun
```

The backend server will start on `http://localhost:8080`

### Starting the Frontend
```bash
cd client
npm install
npm start
```

The frontend development server will start on `http://localhost:3000`

## Project Structure

```
project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # Context providers
│   │   ├── assets/        # Static assets
│   │   └── types/         # TypeScript type definitions
│   
└── server/                # Java backend
    └── src/
        └── main/
            ├── java/
            │   ├── api/   # REST API endpoints
            │   └── business/ # Business logic
            └── webapp/    # Web application files
```

## API Endpoints

- `GET /api/categories` - Get all book categories
- `GET /api/categories/{category-id}/books` - Get books by category
- `GET /api/books/{book-id}` - Get book details
- `POST /api/orders` - Place a new order

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is part of academic coursework and is subject to university guidelines and policies.
