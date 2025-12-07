
# UltraShip

🚀 UltraShip – Full-Stack Employee Management application.

**UltraShip is a full-stack Proof-of-Concept application** is built on **GraphQL, Node.js, Express, MongoDB, and a premium React + Tailwind CSS frontend.**

The platform showcases a clean design system, **role-based access control, grid & tile views, pagination, authentication, and mutation workflows**

Visit the project at
```
https://ultraship-phi.vercel.app
```
Log-In
```
Username: admin
Password: AdminPass123
```
After logging in, refresh the page

# ✨ Features

#### 🔐 Authentication & Authorization

- Secure login via JWT tokens

- Role-based access control (admin/employee)

- Admin-only actions: add, edit, delete employees

#### 🧭 Modern UI & Navigation

- Responsive sidebar (hamburger) navigation

- Horizontal top menu

- Glass-morphism UI with Tailwind CSS

- Smooth modal interactions & dynamic actions menu

#### 👥 Employee Management

- Full Grid View with 10+ data columns

- Beautiful Tile View with compact cards

- Detail Modal on tile click

- Edit and Delete employee workflows

- Add new employees (admin only)

#### 📊 Data Features

- Pagination (server-side via GraphQL)

- Sorting support

- Clean schema design for employee data


#### ⚙️ Backend Architecture

- GraphQL API using Apollo Server

- MongoDB with Mongoose models

- Authentication middleware

- Login REST endpoint for JWT creation

- Deployed backend on Render

#### 🌐 Frontend

- React + Vite for fast development

- Tailwind CSS for modern UI

- Apollo Client for GraphQL communication

- Fully mobile responsive

- Seamless deployment on Vercel

#### 🛠️ Tech Stack & Dependencies

## Frontend

- React (Vite)

- Tailwind CSS

- Apollo Client

- React Router

- HeroIcons

- react-hot-toast

- react-select

## Backend

- Node.js + Express

- Apollo Server (GraphQL)

- MongoDB + Mongoose

- bcryptjs

- jsonwebtoken (JWT)

- CORS middleware

## Deployment

- Backend: Render

- Frontend: Vercel

- Database: MongoDB Atlas

## ⚙️ Getting Started (Local Development Setup)

Follow the steps below to run UltraShip locally.


 1. Clone the Repository
 ```
git clone https://github.com/<your-username>/UltraShip.git
cd UltraShip
```

 2. Backend Setup
Navigate to the backend folder:
```
cd backend

Install dependencies:
npm install

Create a .env file:
PORT=4000
MONGO_URI=mongodb://localhost:27017/ultraship
JWT_SECRET=super_secret_key
PAGE_SIZE=10
FRONTEND_URL=http://localhost:5173

Start MongoDB locally:

(If using local MongoDB)

mongod

Seed the database (optional):
node src/seed.js

Start backend:
npm start
```

Backend runs at:
```
- http://localhost:4000/graphql
- http://localhost:4000/login
```
 3. Frontend Setup

Navigate to frontend:

```
cd ../frontend
```
Install frontend dependencies:
```
npm install
```

Create .env in frontend:
```
VITE_BACKEND_URL=http://localhost:4000
```
Start Vite dev server:
```
npm run dev
```

Frontend runs locally at:
```
 http://localhost:5173
```



<img width="1919" height="1034" alt="image" src="https://github.com/user-attachments/assets/b73b17b2-ebe0-4f3e-83f2-209863985113" />

<img width="1918" height="1037" alt="image" src="https://github.com/user-attachments/assets/6573e60c-0248-47d7-af8a-1b2cea08b872" />


