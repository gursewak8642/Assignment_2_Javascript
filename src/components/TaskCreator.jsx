// import React, { useState } from "react";

// export default function TaskCreator({ addTask }) {
//     const [taskTitle, setTaskTitle] = useState("");
//     const [dueDate, setDueDate] = useState("");
//     const [error, setError] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!taskTitle.trim() || !dueDate) {
//             setError("Both title and due date are required.");
//             return;
//         }
//         addTask(taskTitle, dueDate);
//         setTaskTitle("");
//         setDueDate("");
//         setError("");
//     };

//     return (
//         <form onSubmit={handleSubmit} style={{ textAlign: "center", marginBottom: "20px" }}>
//             <input
//                 type="text"
//                 value={taskTitle}
//                 onChange={(e) => setTaskTitle(e.target.value)}
//                 placeholder="Enter task title"
//                 style={{ padding: "10px", width: "300px" }}
//             />
//             <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 style={{ padding: "10px", marginLeft: "10px" }}
//             />
//             <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>Add Task</button>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//         </form>
//     );
// }


import React, { useState } from "react";

export default function TaskCreator({ addTask }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskTitle.trim() || !dueDate) {
            setError("Both title and due date are required.");
            return;
        }
        addTask(taskTitle, dueDate);
        setTaskTitle("");
        setDueDate("");
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ position: "absolute", top: "10px", right: "100px", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)" }}>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                style={{ padding: "10px", width: "200px", marginRight: "10px" }}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ padding: "10px" }}
            />
            <button type="submit" style={{ padding: "10px", marginLeft: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add Task</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
