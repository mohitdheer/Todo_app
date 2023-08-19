import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const Todo_URL = "http://localhost:8080/todo_list";
  // const Todo_URL = "https://todo-backend-2irx.onrender.com/todo_list";
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTodoDatafn = () => {
    setIsLoading(true);
    axios.get(Todo_URL).then((res) => {
      setTodoData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getTodoDatafn();
  }, []);

  return (
    <TodoContext.Provider
      value={{ Todo_URL, todoData, getTodoDatafn, isLoading }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
