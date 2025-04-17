import React from 'react';
import todo from '../json/todo.json';
import styled from 'styled-components';
function colorRandom() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
}
const Container = styled.div`
border:2px solid ${colorRandom()};
border-radius:15px;
width:420px;
padding:20px;
display:flex;
flex-direction:row;
align-items:center;
margin-top:30px;
justify-content:space-between;
`
const DeleteBtn = styled.button`
background:rgb(32, 186, 80);
color:white;
border:none;
width:150px;
height:40px;

`
class Task extends React.Component {
  state = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || todo,
    filter: this.props.filter 
  };

  updateFilteredTasks = () => {
    const { filter, tasks } = this.state;
    if (!filter) return tasks;

    return tasks.filter((task) =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleCheck = (id) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );

    this.setState({ tasks: updatedTasks });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  handleDelete = (id) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: updatedTasks });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  render() {
    const filteredTasks = this.updateFilteredTasks();
    return (
      <div>
        <h1>Приклад завданнь</h1>
        {filteredTasks.map((elem) => (
          <Container key={elem.id}>
            <input
              type="checkbox"
              checked={elem.isDone}
              onChange={() => this.handleCheck(elem.id)}
            />
            <p
              className="text"
              style={{ textDecoration: elem.isDone ? 'line-through' : 'none' }}
            >
              {elem.text}
            </p>
            <DeleteBtn
              type="button"
              onClick={(e) => {
                e.preventDefault();
                this.handleDelete(elem.id);
              }}
            >
              Delete
            </DeleteBtn>
          </Container>
        ))}
      </div>
    );
  }
}

export default Task;


