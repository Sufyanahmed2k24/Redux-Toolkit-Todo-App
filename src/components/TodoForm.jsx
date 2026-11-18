import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todoSLice"
function TodoForm() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput("")
    }
  return (
    <form
    onSubmit={addTodoHandler}
    className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter your todo..."
          className="w-full min-w-0 px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer">
          Add Todo
        </button>
    </form>
  )
}

export default TodoForm
