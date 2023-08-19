import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTodo } from "../context/TodoContext";
import axios from "axios";

const Header = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const { Todo_URL, getTodoDatafn } = useTodo();
  const [todoValue, setTodoValue] = useState({
    Todo: "",
    date,
    status: "pending",
    statusMode: false,
  });

  const addTodo = (e) => {
    e.preventDefault();
    if (todoValue.Todo === "") {
      toast.error("Enter the todo", {
        duration: 1000,
        position: "top-center",
      });
    } else {
      const add = axios.post(Todo_URL, todoValue).then(() => {
        setTodoValue({
          Todo: "",
          date,
          status: "pending",
          statusMode: false,
        });
        getTodoDatafn();
      });
      toast.promise(add, {
        loading: "Saving ...",
        success: <b>Todo added !</b>,
        error: <b>Could not save.</b>,
      });
    }
  };
  return (
    <>
      <header>
        <div className="w-full px-2 sm:px-4 lg:px-14 py-5 flex items-center justify-between ">
          <div>
            <h2 className="text-lg font-semibold">TODO_APP</h2>
          </div>
          <nav>
            <form>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="toDo"
                  id="toDo"
                  value={todoValue.Todo}
                  onChange={(e) =>
                    setTodoValue((prev) => ({ ...prev, Todo: e.target.value }))
                  }
                  placeholder="Add todo"
                  className="border px-3 py-1 rounded-lg outline-none"
                />
                <button
                  onClick={(e) => addTodo(e)}
                  className="px-3 py-1 text-white bg-cyan-400 rounded-lg text-lg font-medium hover:bg-cyan-500 transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
