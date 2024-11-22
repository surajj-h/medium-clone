# Medium Clone

A fully functional Medium-like platform built with Hono and React, featuring article creation, reading, updating, and deletion. The project includes user authentication, profile management.

---

## Features

- **Authentication**
  - User registration and login (JWT-based authentication).
  - Secure password hashing.

- **Articles**
  - Create, update, and delete articles.
  - View articles by other users.

- **Profiles**
    - View user-specific articles and profiles.

- **Backend**
  - Serverless backend with Hono.
  - Robust error handling and input validation.

- **Frontend**
  - Responsive and interactive UI using React.
  - Clean layout inspired by Medium's design.

---

## Tech Stack

### Backend
- **Hono**: Lightweight and fast web framework.
- **PostgreSQL**: Relational database for storing user and article data.
- **Prisma ORM**: For database modeling and queries.
- **JSON Web Tokens (JWT)**: Authentication.

### Frontend
- **React**: Frontend library for building the UI.
- **React Router**: For navigation and routing.
- **Axios**: For API communication.
- **Tailwind CSS**: Styling the frontend components.

---

## Installation and Setup

### Prerequisites
- Node.js (>= 16.0.0)
- PostgreSQL (local or cloud-based instance)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/medium-clone.git
   cd medium-clone
   ```
   
2. **Backend Setup**
    ```bash
    cd backend
    npm install
    cp .env.example .env
    
    # Update the .env file with your PostgreSQL URI and JWT secret
    
    npx prisma migrate dev
    npm start
    ```

3.**Frontend Setup**
    
    cd frontend
    npm install
    npm run dev
    

