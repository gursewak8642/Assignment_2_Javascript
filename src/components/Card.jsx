import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar, Button } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 120px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
`;

const TextContent = styled.div`
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;

function bgcolorChange(props) {
  return props.isDragging ? "lightgreen" : "#E6E6FA"; // Pale purple color
}

export default function Card({ task, index, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    editTask(task.id, editedTitle, editedDueDate);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Enter task title"
                style={{ padding: "10px", width: "100%", marginBottom: "5px" }}
              />
              <input
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                style={{ padding: "10px", width: "100%" }}
              />
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "start", padding: "5px 0" }}>
                <span>
                  <small>
                    #{task.id}
                    {"  "}
                  </small>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", padding: "5px 0" }}>
                <TextContent>{task.title}</TextContent>
              </div>
              {task.dueDate && (
                <div style={{ display: "flex", justifyContent: "center", padding: "5px 0" }}>
                  <TextContent>Due Date: {task.dueDate}</TextContent>
                </div>
              )}
            </>
          )}
          <Icons>
            <div>
              <Avatar
                onClick={() => console.log(task)}
                src={"https://joesch.moe/api/v1/random?key=" + task.id}
              />
            </div>
            <div>
              <Button type="primary" danger onClick={() => deleteTask(task.id)} icon={<DeleteOutlined />} />
              {isEditing ? (
                <Button type="primary" onClick={handleSave} icon={<SaveOutlined />} />
              ) : (
                <Button type="primary" onClick={() => setIsEditing(true)} icon={<EditOutlined />} />
              )}
            </div>
          </Icons>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
