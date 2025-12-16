import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function AddTask() {
  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [category, setCategory] = useState("General");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateTaskList, setUpdateTaskList] = useState(false);

  useEffect(() => {
    async function getTasks() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getTasks();
  }, [updateTaskList]);
  console.log(tasks);
  async function addTask(e) {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const isoDeadline = deadline ? new Date(deadline).toISOString() : null;

    try {
        const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:8080/tasks", {
        
        task,
        isCompleted,
        category,
        deadline: isoDeadline,
        userId,
      },
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

      console.log(res.data);
      alert(res.data.message);
      setTask("");
      setIsCompleted(false);
      setCategory("General");
      setDeadline("");

      setUpdateTaskList((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="d-flex flex-column">
      <Sidebar />

      <div className="d-flex justify-content-center flex-grow-1">
        <div className="card bg-dark text-white align-items-center col-11 col-md-8 col-lg-7 mt-5">
          <h3 className="text-center mb-5 mt-3">Add Your Task</h3>
          <form onSubmit={addTask}>
            <div className="px-3 align-items-center">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="task" className="form-label text-start">
                    <span className="text-danger">*</span>Task:
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white input"
                    id="task"
                    placeholder="Enter Your Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-1 col-6">
                  <label htmlFor="category" className="mb-1">
                    Category:
                  </label>
                  <select
                    className="form-select form-select-md bg-dark text-white input py-2"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="row mt-4">
                <div className="mt-1 col-12">
                  <label htmlFor="status" className="mb-1">
                    Status:
                  </label>
                  <select
                    className="form-select form-select-md bg-dark text-white input-select py-2 border rounded"
                    id="status"
                    value={isCompleted ? "true" : "false"}
                    onChange={(e) => setIsCompleted(e.target.value === "true")}
                  >
                    <option value="false">Not Completed</option>
                    <option value="true">Completed</option>
                  </select>
                </div>
                <div className="col-12 mt-4">
                  <label htmlFor="deadline" className="form-label">
                    <span className="text-danger">*</span>Deadline:
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    className="form-control bg-dark input text-white"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center mt-5">
                <button
                  type="submit"
                  className="align-items-center text-dark add-task-btn mb-3"
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className="d-flex justify-content-center r-tasks">
          <div className=" col-12 col-md-8 col-lg-6 ">
            <p className="text-start ms-3 mt-5 fs-5">Recently Added Tasks : </p>
            {tasks.map((task, index) => (
              <div className="row ms-3 mb-4">
                <div className="card col-11 col-md-8 col-lg-12 bg-dark d-flex flex-row">
                  <span className="card-body text-white text-start">
                    <span>{index + 1}. </span>
                    {task.task}
                  </span>
                  <span className=" text-end text-white mt-3 ">
                    {task.isCompleted ? "Completed" : "Not Completed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
