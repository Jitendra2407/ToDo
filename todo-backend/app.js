// imports modules & dependencies
const express = require("express");
const https = require("https");
const http = require("http"); // Import HTTP module
const { Server } = require("socket.io"); // Import Socket.io
const env = require("dotenv");
const favicon = require("serve-favicon");
const authRoute = require("./src/routes/auth.route");

var path = require("path");
var cors = require("cors");

// imports routes, middleware, and configs
const todos = require("./src/routes/todos.route");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();
const server = http.createServer(app); // Create an HTTP server for Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  },
});

// application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();

// corss-origin-allow-all
const corsOptions = {
  origin: "*", // Frontend URL
};
app.use(cors(corsOptions));
// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// auth router
app.use("/api/auth", authRoute);

// sets default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to TODO Node.js application backend." });
});

// todos api routes
app.use(process.env.APP_API_PREFIX, todos);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

// Setup Socket.io for real-time updates
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Listen for new todos
  socket.on("newTodo", (todo) => {
    console.log("New todo added:", todo);
    io.emit("todoAdded", todo); // Broadcast new todo to all connected clients
  });

  // Listen for todo updates
  socket.on("updateTodo", (updatedTodo) => {
    console.log("Todo updated:", updatedTodo);
    io.emit("todoUpdated", updatedTodo);
  });

  // Listen for todo deletion
  socket.on("deleteTodo", (todoId) => {
    console.log("Todo deleted:", todoId);
    io.emit("todoDeleted", todoId);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// app listens to defined port
const PORT = process.env.APP_PORT || 5000;
server.listen(PORT, () => {
  console.log("TODO-App backend server running on: " + process.env.APP_BASE_URL);
});
