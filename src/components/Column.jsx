import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "antd";
import {  DeleteOutlined, SortAscendingOutlined} from "@ant-design/icons";

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 2.5px;
  width: 96%;
  max-width: 400px; // Set maximum width for responsiveness
  height: 900px;
  overflow-y: scroll;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column({
  title,
  tasks,
  id,
  deleteTask,
  editTask,
  deleteAllTasks,
  sortTasksById,
  sortTasksByTitle,
}) {
  return (
    <Container className="column">
      <Title className="sticky top-0 bg-lightblue">
        {title}
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <Button type="primary" onClick={() => sortTasksById(id)}>
            <SortAscendingOutlined /> ID
          </Button>
          <Button type="primary" onClick={() => sortTasksByTitle(id)}>
            <SortAscendingOutlined /> Title
          </Button>
          <Button type="primary" danger onClick={() => deleteAllTasks(id)}>
            <DeleteOutlined />
          </Button>
        </div>
      </Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Card
                key={task.id}
                index={index}
                task={task}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}