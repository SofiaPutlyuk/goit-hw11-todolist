import React, { Fragment } from "react";
import TodoList from "./TodoList";
import Info from "./Info";
import styled from "styled-components";

const Textarea = styled.textarea`
  width: 500px;
  height: 70px;
`;

function colorRandom() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

const Form = styled.form`
  border: 2px solid ${colorRandom()};
  border-radius: 15px;
  width: 650px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const Button = styled.button`
  background: rgb(32, 186, 80);
  color: white;
  border: none;
  width: 150px;
  height: 40px;
`;

class TodoEditor extends React.Component {
  state = {
    tasks: [],
    textValue: "",
    isDone: false,
  };

  componentDidMount() {
    const storedTasks = localStorage.getItem("Task");
    if (storedTasks) {
      this.setState({ tasks: JSON.parse(storedTasks) });
    } else {
      fetch("/todo.json")
        .then((res) => res.json())
        .then((data) => {
          this.setState({ tasks: data });
          localStorage.setItem("Task", JSON.stringify(data));
        });
    }
  }

  handleTask = ({ target: { value } }) => {
    this.setState({
      textValue: value,
    });
  };

  handleCreateTask = () => {
    const { tasks, textValue } = this.state;
    if (!textValue.trim()) return;

    const updateTask = [
      ...tasks,
      { id: Date.now(), textValue, isDone: false },
    ];

    this.setState({
      tasks: updateTask,
      textValue: "",
    });

    localStorage.setItem("Task", JSON.stringify(updateTask));
  };

  handleDelete = (deletedTask) => {
    const { tasks } = this.state;
    const deleteTask = tasks.filter((task) => task.id !== deletedTask);
    this.setState({
      tasks: deleteTask,
    });
    localStorage.setItem("Task", JSON.stringify(deleteTask));
  };

  handleChecked = (id) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });

    this.setState({ tasks: updatedTasks });
    localStorage.setItem("Task", JSON.stringify(updatedTasks));
  };

  render() {
    const { textValue, tasks } = this.state;
    const { filter } = this.props;

    const filteredTasks = tasks.filter(
      (task) =>
        task.textValue &&
        task.textValue.toLowerCase().includes(filter.toLowerCase())
    );

    const displayedTasks = filter ? filteredTasks : tasks;

    const total = tasks.length;
    const completed = tasks.filter((task) => task.isDone).length;

    return (
      <Fragment>
        <Info total={total} completed={completed} />
        <Form>
          <Textarea
            type="text"
            onChange={this.handleTask}
            value={textValue}
          />
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              this.handleCreateTask();
            }}
          >
            Create
          </Button>
        </Form>
        <TodoList
          task={displayedTasks}
          deleteButton={this.handleDelete}
          istaskDone={this.handleChecked}
        />
      </Fragment>
    );
  }
}

export default TodoEditor;

