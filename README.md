# 🚀 Personal Productivity Manager (MERN Stack)

A full-stack MERN application for managing daily tasks with secure authentication.

This project demonstrates secure backend architecture, JWT authentication, password hashing, middleware handling, and a responsive React frontend.

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Password hashing using bcrypt
- Protected routes (frontend + backend)

### 📝 Task Management
- Create tasks
- Update task status (Completed / Pending)
- Delete tasks
- Filter by priority (Low / Medium / High)
- Search by keyword
- Real-time filtering

### 🛡 Backend Architecture
- RESTful APIs (Node.js + Express)
- MongoDB with Mongoose
- Authentication middleware
- Centralized error handling
- Protected user-specific data access

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS (Custom styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## 🔄 Authentication Flow

1. User registers → Password hashed using bcrypt.
2. User logs in → Server verifies credentials.
3. Server generates JWT token.
4. Token stored in localStorage.
5. Token sent in Authorization header for protected routes.
6. Backend verifies token before allowing access.

---

## 📂 Project Structure

```
client/     → React frontend  
server/     → Express backend
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd project-folder
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🎯 Learning Outcomes

- Implemented stateless authentication using JWT.
- Secured passwords using bcrypt hashing.
- Built middleware-based route protection.
- Designed REST APIs with proper error handling.
- Integrated frontend and backend securely.

---

## 👨‍💻 Author

Your Name  
GitHub: your-profile-link  
