import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const TodoPage = () => {
  const { todoData, getTodoDatafn, isLoading, Todo_URL } = useTodo();
  const [edit, setEdit] = useState({
    editID: 0,
    editState: false,
  });
  const [newTodo, setNewTodo] = useState("");
  const [searchBox, setSearchBox] = useState("");

  const HandleUpdate = (id) => {
    if (newTodo === "") {
      toast.error("Enter the new value / Cancle", {
        duration: 1000,
        position: "top-center",
      });
    } else {
      const update = axios
        .patch(Todo_URL + "/" + id, {
          Todo: newTodo,
        })
        .then(() => {
          setEdit((prev) => ({ ...prev, editState: false }));
          getTodoDatafn();
          setNewTodo("");
        });

      toast.promise(update, {
        loading: "Updating...",
        success: <b>Updated !</b>,
        error: <b>Could not save.</b>,
      });
    }
  };

  const SearchData = todoData.filter((item) => {
    if (searchBox === "") {
      return item;
    } else if (
      item.Todo.toString().toLowerCase().includes(searchBox.toLocaleLowerCase())
    ) {
      return item;
    } else if (
      item.id.toString().toLowerCase().includes(searchBox.toLocaleLowerCase())
    ) {
      return item;
    } else if (
      item.status
        .toString()
        .toLowerCase()
        .includes(searchBox.toLocaleLowerCase())
    ) {
      return item;
    }
  });

  return (
    <>
      <div className="container mx-auto mt-5">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg divide-y divide-gray-200 ">
                <div className="py-3 px-4">
                  <div className="relative max-w-xs">
                    <label htmlFor="hs-table-search" className="sr-only">
                      Search
                    </label>
                    <input
                      type="search"
                      name="hs-table-search"
                      id="hs-table-search"
                      onChange={(e) => setSearchBox(e.target.value)}
                      className="p-3 pl-10 block w-full border outline-none border-gray-200 rounded-md text-sm  "
                      placeholder="Search for items"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                      <svg
                        className="h-3.5 w-3.5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
                        >
                          Task
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase"
                        >
                          Edit status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {isLoading ? (
                        <tr>
                          <td className="px-6 py-4">Loading....</td>
                        </tr>
                      ) : SearchData.length == 0 ? (
                        <tr>
                          <td className="px-6 py-4">No data found</td>
                        </tr>
                      ) : (
                        SearchData.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                {edit.editID === item.id && edit.editState ? (
                                  <input
                                    type="text"
                                    name="newTodo"
                                    id="newTodo"
                                    defaultValue={item.Todo}
                                    className="border rounded px-3 py-2 outline-none"
                                    onChange={(e) => setNewTodo(e.target.value)}
                                  />
                                ) : (
                                  item.Todo
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {item.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {item.status}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                <input
                                  type="checkbox"
                                  name="check"
                                  id="check"
                                  defaultChecked={item.statusMode}
                                  disabled={item.statusMode}
                                  onClick={(e) => {
                                    const update = axios
                                      .patch(Todo_URL + "/" + item.id, {
                                        status: "Completed",
                                        statusMode: true,
                                      })
                                      .then(() => {
                                        getTodoDatafn();
                                      });

                                    toast.promise(update, {
                                      loading: "Saving...",
                                      success: <b>Status completed !</b>,
                                      error: <b>Could not save.</b>,
                                    });
                                  }}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                                {edit.editID === item.id && edit.editState ? (
                                  <div className="flex gap-3 justify-end">
                                    <button
                                      onClick={() => HandleUpdate(item.id)}
                                      className="px-5 text-lg font-medium py-1 text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300  rounded-lg"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() =>
                                        setEdit((prev) => ({
                                          ...prev,
                                          editState: false,
                                        }))
                                      }
                                      className="px-5 text-lg font-medium py-1 text-white bg-red-500 hover:bg-red-600 transition-all duration-300  rounded-lg"
                                    >
                                      Cancle
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex gap-3 justify-end">
                                    <button
                                      onClick={() => {
                                        setEdit((prev) => ({
                                          ...prev,
                                          editID: item.id,
                                          editState: true,
                                        }));
                                      }}
                                      disabled={item.statusMode}
                                      className="px-5 text-lg font-medium py-1 text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300  rounded-lg"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        const update = axios
                                          .delete(Todo_URL + "/" + item.id)
                                          .then(() => {
                                            getTodoDatafn();
                                          });
                                        toast.promise(update, {
                                          loading: "Deleting...",
                                          success: <b>Deleted !</b>,
                                          error: <b>Could not save.</b>,
                                        });
                                      }}
                                      className="px-5 text-lg font-medium py-1 text-white bg-red-500 hover:bg-red-600 transition-all duration-300  rounded-lg"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
