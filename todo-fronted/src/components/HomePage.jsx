// import AddNewTodoForm from "./AddNewTodoForm";
// import TodosList from "./TodosList";

// const HomePage = () => {
//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center">
//         {/* APP HEADING / TITLE */}
//         <h1 className="my-5 text-4xl font-bold text-black">Todo App</h1>

//         {/* ADD NEW TODOS FORM COMPONENT */}
//         <AddNewTodoForm />

//         {/* TODOS LIST COMPONENTS */}
//         <TodosList />
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import { Link } from "react-router-dom"; // Add this import statement
import { Navigate } from "react-router-dom"; // For redirection
import { useAuth } from "../store/auth"; // Import useAuth hook from AuthContext
import AddNewTodoForm from "./AddNewTodoForm";
import TodosList from "./TodosList";

const HomePage = () => {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from AuthContext

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/Nav */}
      <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Todo App
        </h1>
        <Link
          to="/logout"
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200 text-sm sm:text-base"
        >
          Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-0 sm:space-x-8">
        {/* Add New Todo Form */}
        <div className="w-full sm:w-1/2 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <AddNewTodoForm />
        </div>

        {/* Todos List */}
        <div className="w-full sm:w-1/2 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <TodosList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

