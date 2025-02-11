import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo, getAllTodos } from "../redux/actions/todosAction";

const TodosList = () => {
  const dispatch = useDispatch();
  const { isLoading, todos, error, isLoadingPost, isLoadingDelete } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getAllTodos);
  }, [dispatch, isLoadingPost, isLoadingDelete]);

  // make a function to handle delete a todo
  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo({ todoId }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-[90%] md:w-[80%] lg:w-full my-8 space-y-8">
      {/* Loading & Error Redux State */}
      {isLoading && (
        <h2 className="text-gray-800 text-2xl font-semibold my-2">
          Loading...
        </h2>
      )}
      {error && (
        <h2 className="text-red-600 text-2xl font-semibold my-2">
          Error: {error.message}
        </h2>
      )}

      {/* Todos List */}
      {todos.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-semibold my-2">
          Sorry! No Todos Found.
        </h2>
      ) : (
        todos.todos.map((todo, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl p-6 my-4 w-full hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <h2 className="text-gray-800 text-xl font-semibold mb-2">
              <span className="text-indigo-600">Title:</span>{" "}
              <span
                className={`${
                  todo.completed ? "line-through text-green-500" : "text-black"
                }`}
              >
                {todo.title}
              </span>
            </h2>

            <p className="text-gray-700 text-base mb-4">
              <span className="text-indigo-600 font-semibold">
                Description:
              </span>{" "}
              {todo.description}
            </p>

            {/* Button Container */}
            <div className="flex flex-wrap justify-start gap-4">
              <Link
                to={`edit-todo/?id=${todo._id}`}
                className="bg-indigo-600 text-white text-center py-2 px-6 rounded-md shadow-lg transition-all duration-200 hover:bg-indigo-700 transform hover:scale-105"
              >
                Edit
              </Link>

              <button
                className="bg-red-600 text-white py-2 px-6 rounded-md shadow-lg transition-all duration-200 hover:bg-red-700 transform hover:scale-105"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodosList;


