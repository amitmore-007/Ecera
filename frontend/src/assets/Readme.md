


# 💡 IdeaTracker

**IdeaTracker** is a full-stack application designed to help innovators submit, manage, and track their business or startup ideas in a structured and secure manner. From capturing the core idea to defining market potential and competition level, the platform empowers users to store and manage their startup aspirations digitally.


## 📝 Features

- User Registration and Authentication using JWT
- Personal Dashboard for managing ideas
- Create, Read, Update, Delete (CRUD) operations for ideas
- Secure and private access to each user's data
- Filtering by category and status
- Responsive and clean user interface

---

## 📸 Screenshots

> Store your screenshots inside `frontend/src/assets/` and reference them like below.

### 🔐 Login Page
![Login Page](frontend/src/assets/login.png)

### 🧠 Idea Dashboard
![Dashboard](frontend/src/assets/dashboard.png)

### 📝 Register Page
![Register Page](frontend/src/assets/Register.png)

### 📝 Landing Page
![Landing Page](frontend/src/assets/Landing.png)

---

## 🛠️ Tech Stack

| Layer          | Technology                                 |
|------------    |--------------------------------------------|
| Frontend       | React.js                                   |
| Backend        | Node.js, Express.js                        |
| Database       | MongoDB (Mongoose)                         |
| Authentication | JSON Web Tokens (JWT)                      |


---

## 🧩 Folder Structure

### Frontend (React)

```

frontend/
├── src/
│   ├── components/
│   │   ├── IdeaForm.jsx
│   │   ├── IdeaCard.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   └── context/
│       └── AuthContext.jsx

```

### Backend (Node.js + Express)

```

backend/
├── models/
│   ├── User.js
│   └── Idea.js
├── routes/
│   ├── users.js
│   └── ideas.js
├── middleware/
│   └── auth.js
├── controllers/
├── .env
├── server.js

````

---

## 🗃️ Database Design

### User Schema
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
````

### Idea Schema

```js
{
  user: ObjectId (ref to User),
  ideaName: String,
  targetAudience: String,
  problemSolved: String,
  description: String,
  category: String,
  marketSize: String,
  competitionLevel: String,
  estimatedBudget: String,
  timeToMarket: String,
  notes: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Relationship

* One-to-Many → One User can have Many Ideas

---

## 🔐 Authentication Flow

* JWT token is generated on successful login/registration
* Token is stored in local storage and attached in every request header
* A middleware verifies the token and gives access to protected routes

---

## 🔄 Application Flow

1. Users access the landing page without authentication
2. They can register or log in using their email and password
3. Upon login, a JWT token is stored for session management
4. Authenticated users are redirected to their personal dashboard
5. Users can create, update, or delete startup ideas
6. Ideas can be filtered based on category or status
7. Backend ensures all requests are validated using the JWT token

---

## 📦 How to Run Locally

### Backend


cd backend
npm install
npm run dev


### Frontend


cd frontend
npm install
npm run dev


> Make sure to configure the `.env` file in the backend with:

env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string


---

## 🤝 Contributing

Feel free to fork this repo and raise PRs for improvements or features. Make sure to document any changes you make.

---


## 📬 Contact

For questions or feedback, feel free to reach out:

* GitHub: [@amitmore-007](https://github.com/amitmore-007)
* Email: [amore43035@gmail.com](mailto:amore43035@gmail.com)

