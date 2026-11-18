import { createSlice, nanoid } from '@reduxjs/toolkit'

const todoSLice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {
        // ADD NEW TODO
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },

        // REMOVE TODO
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },

        // UPDATE TODO
        updateTodo: (state, action) => {
            const {id, text} = action.payload

            const todo = state.todos.find((todo)=> todo.id === id);

            if (todo) {
                todo.text = text;
            }
        },

        // TOGGLE TODO
        toggleCompleted: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo, toggleCompleted} = todoSLice.actions

export default todoSLice.reducer