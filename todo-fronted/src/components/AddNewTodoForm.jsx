import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/actions/todosAction";

const AddNewTodoForm = () => {
  const dispatch = useDispatch();
  const { isLoadingPost, successPost, errorPost } = useSelector((state) => state.todos);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setTodoTitle("");
      setTodoDescription("");
      setValidationError("");

      // add new todo to the list
      dispatch(createTodo({ todoTitle, todoDescription }));
    }
  };

  useEffect(() => {
    if (successPost) {
      setSuccessMessage(successPost.message);
    } else if (errorPost) {
      setValidationError("Error: " + errorPost.message);
    }
  }, [successPost, errorPost]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      setValidationError("");
    }, 3000);
  }, [successMessage, validationError]);

  return (
    <div className="bg-white w-[90%] md:w-[80%] lg:w-full p-8 rounded-lg shadow-xl space-y-6 max-w-lg mx-auto">
      {/* Form Validation Message */}
      {validationError && (
        <div className="w-full h-[45px] bg-red-600 text-center py-3 rounded-md shadow-md">
          <p className="text-white text-sm font-medium">{validationError}</p>
        </div>
      )}

      {/* Form Success Message */}
      {successMessage && (
        <div className="w-full h-[45px] bg-green-600 text-center py-3 rounded-md shadow-md">
          <p className="text-white text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <form
        className="flex flex-col space-y-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* TODO TITLE INPUT FIELD */}
        <div>
          <label
            className="text-sm font-semibold text-gray-700 mb-2 block"
            htmlFor="todoTitle"
          >
            Todo Title
          </label>
          <input
            id="todoTitle"
            type="text"
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Add Todo Title"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
        </div>

        {/* TODO DESCRIPTION INPUT FIELD */}
        <div>
          <label
            className="text-sm font-semibold text-gray-700 mb-2 block"
            htmlFor="todoDescription"
          >
            Todo Description
          </label>
          <textarea
            id="todoDescription"
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Add Todo Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </div>

        {/* ADD BUTTON */}
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-md shadow-lg w-full py-3 mt-2 transition-all duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoadingPost || !todoTitle || !todoDescription}
        >
          {isLoadingPost ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddNewTodoForm;
