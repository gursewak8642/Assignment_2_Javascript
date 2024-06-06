import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskCreator from "./TaskCreator"; // Import TaskCreator component

export default function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {
      incomplete: [],
      completed: [],
      inReview: [],
      backlog: [],
    };
    setIncomplete(savedTasks.incomplete);
    setCompleted(savedTasks.completed);
    setInReview(savedTasks.inReview);
    setBacklog(savedTasks.backlog);

    const maxId = Math.max(
      0,
      ...savedTasks.incomplete.map((task) => task.id),
      ...savedTasks.completed.map((task) => task.id),
      ...savedTasks.inReview.map((task) => task.id),
      ...savedTasks.backlog.map((task) => task.id)
    );
    setTaskIdCounter(maxId + 1);
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage();
  }, [incomplete, completed, inReview, backlog]);

  // Check if all tasks are empty and reset taskIdCounter
  useEffect(() => {
    if (areAllTasksEmpty()) {
      setTaskIdCounter(1);
    }
  }, [incomplete, completed, inReview, backlog]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inReview,
      ...backlog,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete((prev) => removeItemById(taskId, prev));
        break;
      case "2":
        setCompleted((prev) => removeItemById(taskId, prev));
        break;
      case "3":
        setInReview((prev) => removeItemById(taskId, prev));
        break;
      case "4":
        setBacklog((prev) => removeItemById(taskId, prev));
        break;
      default:
        break;
    }
  }

  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1":
        updatedTask = { ...task, completed: false };
        setIncomplete((prev) => [updatedTask, ...prev]);
        break;
      case "2":
        updatedTask = { ...task, completed: true };
        setCompleted((prev) => [updatedTask, ...prev]);
        break;
      case "3":
        updatedTask = { ...task, completed: false };
        setInReview((prev) => [updatedTask, ...prev]);
        break;
      case "4":
        updatedTask = { ...task, completed: false };
        setBacklog((prev) => [updatedTask, ...prev]);
        break;
      default:
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  const addTask = (title, dueDate) => {
    const newTask = {
      userId: 1,
      id: taskIdCounter,
      title,
      dueDate,
      completed: false,
    };
    setTaskIdCounter(taskIdCounter + 1);
    setIncomplete((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setIncomplete((prev) => removeItemById(id, prev));
    setCompleted((prev) => removeItemById(id, prev));
    setInReview((prev) => removeItemById(id, prev));
    setBacklog((prev) => removeItemById(id, prev));
  };

  const deleteAllTasks = (columnId) => {
    switch (columnId) {
      case "1":
        setIncomplete([]);
        break;
      case "2":
        setCompleted([]);
        break;
      case "3":
        setInReview([]);
        break;
      case "4":
        setBacklog([]);
        break;
      default:
        break;
    }
  };

  const areAllTasksEmpty = () => {
    return (
      incomplete.length === 0 &&
      completed.length === 0 &&
      inReview.length === 0 &&
      backlog.length === 0
    );
  };

  const saveTasksToLocalStorage = () => {
    const tasks = {
      incomplete,
      completed,
      inReview,
      backlog,
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Edit task function
  const editTask = (id, newTitle, newDueDate) => {
    const updateTaskInArray = (array) => {
      return array.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, dueDate: newDueDate }
          : task
      );
    };

    setIncomplete((prev) => updateTaskInArray(prev));
    setCompleted((prev) => updateTaskInArray(prev));
    setInReview((prev) => updateTaskInArray(prev));
    setBacklog((prev) => updateTaskInArray(prev));
  };

  // Sort tasks by ID
  const sortTasksById = (columnId) => {
    switch (columnId) {
      case "1":
        setIncomplete((prev) => [...prev].sort((a, b) => a.id - b.id));
        break;
      case "2":
        setCompleted((prev) => [...prev].sort((a, b) => a.id - b.id));
        break;
      case "3":
        setInReview((prev) => [...prev].sort((a, b) => a.id - b.id));
        break;
      case "4":
        setBacklog((prev) => [...prev].sort((a, b) => a.id - b.id));
        break;
      default:
        break;
    }
  };

  // Sort tasks by title
  const sortTasksByTitle = (columnId) => {
    switch (columnId) {
      case "1":
        setIncomplete((prev) =>
          [...prev].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case "2":
        setCompleted((prev) =>
          [...prev].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case "3":
        setInReview((prev) =>
          [...prev].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case "4":
        setBacklog((prev) =>
          [...prev].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <DragDropContext
        onDragEnd={handleDragEnd}
        style={{ backgroundColor: "skyblue" }}
      >
        <h2
          style={{
            position: "absolute",
            marginTop: "10px",
            top: "30px",
            left: "100px",
            fontFamily: "inherit",
            fontSize: "1.6rem",
            fontWeight: "bold",
            lineHeight: "1.25",
            letterSpacing: "-1px",
            textTransform: "uppercase",
            color: "skyblue",
          }}
        >
          TASK BOARD
        </h2>

        <TaskCreator addTask={addTask} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "1300px",
            margin: "auto",
            marginLeft: "50px",
            marginBottom: "20px",
            gap: "20px",
            marginTop: "110px",
          }}
        >
          <Column
            title={"TO DO"}
            tasks={incomplete}
            id={"1"}
            deleteTask={deleteTask}
            deleteAllTasks={deleteAllTasks}
            editTask={editTask}
            sortTasksById={sortTasksById}
            sortTasksByTitle={sortTasksByTitle}
          />
          <Column
            title={"IN REVIEW"}
            tasks={inReview}
            id={"3"}
            deleteTask={deleteTask}
            deleteAllTasks={deleteAllTasks}
            editTask={editTask}
            sortTasksById={sortTasksById}
            sortTasksByTitle={sortTasksByTitle}
          />
          <Column
            title={"DONE"}
            tasks={completed}
            id={"2"}
            deleteTask={deleteTask}
            deleteAllTasks={deleteAllTasks}
            editTask={editTask}
            sortTasksById={sortTasksById}
            sortTasksByTitle={sortTasksByTitle}
          />
          <Column
            title={"BACKLOG"}
            tasks={backlog}
            id={"4"}
            deleteTask={deleteTask}
            deleteAllTasks={deleteAllTasks}
            editTask={editTask}
            sortTasksById={sortTasksById}
            sortTasksByTitle={sortTasksByTitle}
          />
        </div>
      </DragDropContext>
    </>
  );
}
