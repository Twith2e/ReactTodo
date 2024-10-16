import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [editInput1, setEditInput1] = useState("");
  const [editInput2, setEditInput2] = useState("");
  const [editId, setEditId] = useState(null);
  //   const [editValue, setEditValue] = useState([]);

  function updateInput1(e) {
    setInput1(e.target.value);
  }

  function updateInput2(e) {
    setInput2(e.target.value);
  }

  function updateEditInput1(e) {
    setEditInput1(e.target.value);
  }

  function updateEditInput2(e) {
    setEditInput2(e.target.value);
  }

  function addTodo() {
    if (input1.trim() !== "" && input2.trim() !== "") {
      const inputObject = {
        title: input1,
        content: input2,
      };
      setTodos((t) => [...t, inputObject]);
      setInput1("");
      setInput2("");
    } else {
      alert("fill input");
    }
  }

  function deleteTodo(index) {
    const newTodo = todos.filter((_, i) => i !== index);
    setTodos(newTodo);
  }

  function editTodo(index) {
    setEditId(index);
    setEditInput1(todos[index].title);
    setEditInput2(todos[index].content);
  }

  function updateTodo() {
    const editedTodo = [...todos];
    const editedObject = {
      title: editInput1,
      content: editInput2,
    };
    editedTodo[editId] = editedObject;
    setTodos(editedTodo);
    setEditId(null);
  }

  return (
    <div className="text-center">
      <h1>ToDO</h1>
      <div>
        <input
          type="text"
          value={input1}
          placeholder="Input a task title..."
          onChange={updateInput1}
        />
        <input
          type="text"
          value={input2}
          placeholder="Input a task content..."
          onChange={updateInput2}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ol className="d-flex flex-column gap-3 align-items-center p-0 my-4 ">
        {todos.map((todo, index) => (
          <li
            className="task d-flex gap-3 align-items-center justify-content-between bg-dark text-light px-3 w-25"
            key={index}
          >
            {editId === index ? (
              <>
                <input
                  type="text"
                  value={editInput1}
                  placeholder="Input a task title..."
                  onChange={updateEditInput1}
                />
                <input
                  type="text"
                  value={editInput2}
                  placeholder="Input a task content..."
                  onChange={updateEditInput2}
                />
                <button className="add-button" onClick={updateTodo}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <span>{todo.content}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(index)}
                >
                  🗑️
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => editTodo(index)}
                >
                  ✏️
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
