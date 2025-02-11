# MERN Stack TODO Application

A real-time To-Do application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with `socket.io` for real-time updates.

## Features

- Add, update, and delete to-do items.
- Real-time synchronization across multiple clients using `socket.io`.
- User authentication using JWT.
- RESTful API architecture.
- MongoDB as the database.

---

## Tech Stack

### Frontend:
- React.js
- Axios for API calls
- Socket.io-client for real-time communication

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- Socket.io for real-time updates
- JWT authentication

---

## Project Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- MongoDB (Local or Cloud)
- npm or yarn

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/todo-app.git
cd todo-app
```

### 2. Backend Setup
```sh
cd todo-backend
```

#### Install Dependencies
```sh
npm install express serve-favicon mongoose dotenv cors
```

#### Configure Environment Variables
Create a `.env` file in the `todo-backend` directory and add the following:
```env
# APP ENVIRONMENT VARIABLES
APP_NAME=ToDo
APP_PORT=5000
APP_BASE_URL=http://localhost:5000
APP_API_PREFIX=/api/v1

# DB ENVIRONMENT VARIABLES
MONGO_URI=<your_mongo_uri>
JWT_SECRET_KEY=<your_jwt_secret>
```

#### Run the Backend Server
```sh
nodemon app.js
```

By default, the backend runs on `http://localhost:5000`.

### 3. Frontend Setup
```sh
cd ../todo-frontend
```

#### Install Dependencies
```sh
npm install
```

#### Configure Environment Variables
Create a `.env` file in `todo-frontend` and add the following:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

#### Run the Frontend Server
```sh
npm start
```

By default, the frontend runs on `http://localhost:3000`.

---

## API Documentation

```sh
|---------------------------------------------------------------------------------|
| METHOD:  URL:                                        // DESCRIPTION             |
|---------------------------------------------------------------------------------|
| GET:     http://localhost:5000/                      // defaults welcome routes |
| GET:     http://localhost:5000/api/v1/todos-all      // get all todos           |
| GET:     http://localhost:5000/api/v1/todo/:id       // get a single todo       |
| POST:    http://localhost:5000/api/v1/todo/new       // create a new todo       |
| POST:    http://localhost:5000/api/v1/todos-many     // create many todos       |
| PUT:     http://localhost:5000/api/v1/todo/:id       // update a todo           |
| DELETE:  http://localhost:5000/api/v1/todo/:id       // delete a todo           |
|---------------------------------------------------------------------------------|
```

---

## VS-Code Extensions

Install the below extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Linting Setup

To lint and format your code automatically according to the Airbnb style guide, follow these steps:

### Install Dev Dependencies

```sh
npm install -D eslint prettier
npx install-peerdeps --dev eslint-config-airbnb-base
npm install -D eslint-config-prettier eslint-plugin-prettier
```

---

## WebSocket Events (Socket.io)

### Events Sent by Server:
- `todo:created` - When a new to-do is created
- `todo:updated` - When a to-do is updated
- `todo:deleted` - When a to-do is deleted

### Events Sent by Client:
- `todo:create` - Create a new to-do
- `todo:update` - Update an existing to-do
- `todo:delete` - Delete a to-do

---

## License
This project is licensed under the MIT License.

## Author
Jitendra Kumar Thakur

