# Task Manager Frontend

## 📌 Overview
The Task Manager Frontend is a Vue.js-based web application that provides an interface for managing tasks. It integrates with the Task Manager API and includes authentication, task assignment, and user management.

## 🚀 Technologies Used
- **Vue 3** (Composition API & TypeScript)
- **Pinia** (State Management)
- **Vue Router** (Client-side Routing)
- **Vuetify** (UI Components)
- **Axios** (HTTP Client)
- **Vite** (Build Tool)

## ⚙️ Project Setup
### 1️⃣ Clone the Repository
```sh
  git clone https://github.com/your-user/taskmanager-frontend.git
  cd taskmanager-frontend
```

### 2️⃣ Install Dependencies
```sh
  npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and configure the API URL:
```env
VITE_API_URL=http://localhost:8080/api
```

### 4️⃣ Run the Application
```sh
  npm run dev
```
The application will be available at `http://localhost:5173/`.

## 🔑 Authentication & Security
- **JWT Authentication** (Token-based authentication with session storage)
- **Route Guards** (Protected routes using Vue Router)
- **Automatic Redirect on Logout**

## 📜 Features
### ✅ Task Management
- Create, update, delete, and list tasks
- Assign tasks to users
- View assigned tasks

### ✅ User Authentication
- Login with credentials
- Logout functionality
- Redirect to login on session expiration

## 🛠️ Project Structure
```
├── src
│   ├── components      # Reusable UI components
│   ├── pages           # View pages
│   ├── router          # Vue Router configuration
│   ├── services        # API services (taskService, authService, userService)
│   ├── stores          # Pinia state management
│   ├── styles          # Global styles
│   ├── App.vue         # Main Vue app entry
│   ├── main.ts         # Main entry point
│   ├── vite.config.ts  # Vite configuration
```

## 🛠️ API Endpoints Used
### 📍 Authentication
| Method | Endpoint | Description |
|--------|-------------|-------------|
| `POST` | `/auth/login` | Authenticate user and get JWT token |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/logout` | Logout user |

### 📍 Tasks
| Method | Endpoint | Description |
|--------|-------------|-------------|
| `GET`  | `/tasks` | Retrieve all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT`  | `/tasks/{id}` | Update a task |
| `DELETE` | `/tasks/{id}` | Delete a task |
| `PUT` | `/tasks/{id}/assign/{userId}` | Assign a task to a user |

## 🛠️ Running Tests
To execute unit tests, run:
```sh
  npm run test
```

## 📜 License
This project is open-source and available under the MIT License.

