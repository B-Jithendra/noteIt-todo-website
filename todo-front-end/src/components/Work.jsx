import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
function Work() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await axios.get("http://localhost:8080/dashboard/work", {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 attach token here
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getTasks();
  }, []);
  async function updateTask(id, currentStatus) {
    try {
      const res = await axios.put(
        `http://localhost:8080/tasks/${id}`,
        {
          isCompleted: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, isCompleted: !currentStatus } : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask(id) {
    try {
      const res = await axios.delete(`http://localhost:8080/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token here
        },
      });
      console.log(res);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Sidebar />
      {tasks.length > 0 ? (
        <div className="flex-grow-1">
          <h4 className="text-center mt-3">Your Tasks</h4>

          <div className="px-3 table-responsive">
            <table className="table table-dark text-white text-center border-radius table-striped table-responsive">
              <thead className="border-radius">
                <tr className="border-radius py-5">
                  <th scope="col" className="p-3">
                    S.No
                  </th>
                  <th scope="col" className="p-3">
                    Task
                  </th>
                  <th scope="col" className="p-3">
                    Category
                  </th>
                  <th scope="col" className="p-3">
                    Status<br></br>(click to change)
                  </th>
                  <th scope="col" className="p-3">
                    Deadline
                  </th>
                  <th scope="col" className="p-3">
                    Discard
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {tasks.map((task, index) => (
                  <tr className="" key={task._id}>
                    <th scope="row " className="p-3">
                      {index + 1}
                    </th>
                    <td className="py-3">{task.task}</td>
                    <td className="py-3">
                      {" "}
                      <i
                        className={`fa-solid fa-circle  ${
                          task.category === "Work"
                            ? "text-white"
                            : task.category == "Urgent"
                            ? "text-danger"
                            : task.category == "Personal"
                            ? "text-success"
                            : "text-primary"
                        }`}
                      ></i>{" "}
                      {task.category || "General"}
                    </td>
                    <td className="py-3">
                      {task.isCompleted ? (
                        <i
                          className="fa-solid fa-thumbs-up text-success fs-5 cursor-pointer"
                          onClick={() => updateTask(task._id, task.isCompleted)}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-thumbs-down text-danger fs-5 cursor-pointer"
                          onClick={() => updateTask(task._id, task.isCompleted)}
                        ></i>
                      )}
                      {console.log(task)}
                    </td>
                    <td className="py-3">
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : "No deadline"}
                    </td>
                    <td className="py-3">
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteTask(task._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center no-task">
          <p>No tasks Added Yet</p>
          <Link to="/addtask">Add Task</Link>
        </div>
      )}
    </div>
  );
}

export default Work;
