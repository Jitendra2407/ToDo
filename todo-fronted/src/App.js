// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import EditPage from "./components/EditPage";
// import HomePage from "./components/HomePage";
// import NotFound from "./components/NotFoundPage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/edit-todo" element={<EditPage />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="login" element={<Login/>}/>
//         <Route path="register" element={<Register/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import io from "socket.io-client";
import axios from "axios";

import EditPage from "./components/EditPage";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFoundPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

// Create Todo Context for Global State
export const TodoContext = createContext();

const socket = io("http://localhost:5000"); // Replace with your actual backend URL

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch initial todos from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/todos-all")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Listen for real-time updates from Socket.io
  useEffect(() => {
    socket.on("todoAdded", (todo) => {
      setTodos((prevTodos) => [...prevTodos, todo]);
    });

    socket.on("todoUpdated", (updatedTodo) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
    });

    socket.on("todoDeleted", (todoId) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit-todo" element={<EditPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
