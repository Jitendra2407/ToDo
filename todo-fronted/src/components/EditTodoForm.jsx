import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const EditTodoForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!searchParams.get("id")) {
      navigate("/");
    } else {
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/" + searchParams.get("id"))
        .then((res) => {
          setTodoTitle(res.data.todo.title);
          setTodoDescription(res.data.todo.description);
          setTodoCompleted(res.data.todo.completed);
        })
        .catch((err) => {
          setValidationError("Error: " + err.message);
        });
    }
  }, [searchParams, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation check and set error message
    if (todoTitle.length === 0) {
      setValidationError("Title filed is required");
    } else if (todoDescription.length === 0) {
      setValidationError("Description filed is required");
    }

    // if validation is ok, then add new todo
    if (todoTitle && todoDescription) {
      axios
        .put(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/" + searchParams.get("id"), {
          title: todoTitle,
          description: todoDescription,
          completed: todoCompleted,
        })
        .then((res) => {
          if (res.status === 200) {
            setSuccessMessage("Todo updated successfully");

            // after 2 seconds, redirect to todo list
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            setValidationError("Error: " + res.message);
          }
        })
        .catch((err) => {
          setValidationError("Error: " + err.message);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      setValidationError("");
    }, 3000);
  }, [successMessage, validationError]);

  return (
    <div className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] p-6 sm:p-8 rounded-lg shadow-xl mx-auto">
      {/* Form Validation Message */}
      {validationError && (
        <div className="w-full h-[45px] bg-red-600 text-center py-3 rounded-md shadow-md mb-4">
          <p className="text-white text-lg font-semibold">{validationError}</p>
        </div>
      )}

      {/* Form Success Message */}
      {successMessage && (
        <div className="w-full h-[45px] bg-green-600 text-center py-3 rounded-md shadow-md mb-4">
          <p className="text-white text-lg font-semibold">{successMessage}</p>
        </div>
      )}

      <form
        className="flex flex-col items-center justify-center space-y-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* TODO TITLE INPUT FIELD */}
        <input
          type="text"
          className="w-full border-2 border-gray-300 px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          placeholder="Add Todo Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />

        {/* TODO DESCRIPTION INPUT FIELD */}
        <textarea
          className="w-full border-2 border-gray-300 px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          cols="30"
          rows="4"
          placeholder="Add Todo Description"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />

        {/* TODO COMPLETED CHECKBOX */}
        <div className="w-full flex items-center justify-start my-4">
          <input
            type="checkbox"
            checked={todoCompleted}
            id="todoCheckBox"
            className="w-5 h-5 rounded-md cursor-pointer focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setTodoCompleted(e.target.checked)}
          />
          <label htmlFor="todoCheckBox" className="ml-3 text-md cursor-pointer">
            Todo Completed
          </label>
        </div>

        {/* BUTTONS */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-x-4 sm:space-y-0">
          <button
            type="submit"
            className="bg-green-600 text-white rounded-md shadow-md w-full sm:w-auto p-3 transition-all duration-200 hover:bg-green-700 hover:scale-105"
          >
            Update Todo
          </button>

          <Link
            to="/"
            className="bg-blue-600 text-white rounded-md shadow-md w-full sm:w-auto p-3 transition-all duration-200 hover:bg-blue-700 hover:scale-105"
          >
            Go Back Homepage
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTodoForm;
