import { useSelector, useDispatch } from "react-redux";
import TodoForm from "./TodoForm";
import TodoHeading from "./TodoHeading";
import { removeTodo, updateTodo, toggleCompleted } from "../features/todoSLice";
import { useState } from "react";

function Todo() {

  const todos = useSelector(state => state.todos.todos)
  const dispatch = useDispatch()
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (todo) => {
    setEditId(todo.id),
    setEditText(todo.text)
  }
  
  const handleSave = (id) => {
    if (!editText.trim()) return;

    dispatch(updateTodo({
      id: id,
      text: editText
    }));

    setEditId(null);
    setEditText("");
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* Heading */}
      <TodoHeading />

      {/* Add Todo */}
      
        <TodoForm />
      

      {/* Todo List */}
      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
        /* Single Todo Item */
        <div key={todo.id} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-4 rounded-2xl shadow">

          {/* Checkbox and Input */}
          <div className="flex items-center gap-3 flex-1 min-w-0">

            <input
              checked={todo.completed || false}
              onChange={()=> dispatch(toggleCompleted(todo.id))}
              type="checkbox"
              className="w-5 h-5 shrink-0 cursor-pointer accent-green-500"
            />

            <input
              value={editId === todo.id ? editText : todo.text}
              onChange={(e) => setEditText(e.target.value)}
              type="text"
              readOnly={editId !== todo.id}
              className= {`w-full min-w-0 px-3 py-2 rounded-lg bg-gray-200 outline-none ${todo.completed ? "line-through text-gray-500" : ""}`}
            />

          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:w-auto">

            {editId === todo.id ? (
              <button
              onClick={()=>handleSave(todo.id)}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-green-400 hover:bg-green-500 font-semibold transition cursor-pointer">
                Save
              </button>
              ) : (
              <button
              onClick={()=> handleEdit(todo)}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-red-400 hover:bg-red-500 font-semibold transition cursor-pointer">
                Edit
              </button>
              )}

            <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-red-400 hover:bg-red-500 font-semibold transition cursor-pointer">
              Delete
            </button>

          </div>

        </div>
        ))}
      </div>

    </div>
  );
}

export default Todo;
