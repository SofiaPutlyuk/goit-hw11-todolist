import React from "react"
import styled from "styled-components";
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
class TodoList extends React.Component {
    render() {
        return (
            <div>
                {this.props.task.length > 0 ? (
                    this.props.task.map((elem) => (
                        <Container key={elem.id}>
                            <input type="checkbox" checked={elem.isDone}
                                onChange={() => this.props.istaskDone(elem.id)} />
                            <p className="text" style={{ textDecoration: elem.isDone ? 'line-through' : 'none' }}>
                                {elem.textValue}
                            </p>
                            <p className="text" style={{ textDecoration: elem.isDone ? 'line-through' : 'none' }}>
                                {elem.text}
                            </p>
                            <DeleteBtn type="button" onClick={(e) => { e.preventDefault(); this.props.deleteButton(elem.id) }}>Delete</DeleteBtn>
                        </Container>
                    ))
                ) :
                    (
                        <p>Немає доданих завданнь</p>
                    )
                }
            
            </div>
        )
    }
}
export default TodoList