import React from "react";
import TodoPage from "./components/TodoPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </>
  );
};

export default App;
