// part 6
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

//reducer thunk, 16ms35ss
export const getTodos = createAsyncThunk(
    'todos/todosFetched', async () => { //17ms35ss
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
        return response.data;
    });

// 22ms42ss
export const addTodo = createAsyncThunk(
    'todos/todoAdded', async (title) => {
        const newTodo = {
            id: nanoid(),
            title,
            completed: false,
        }

        // 24ms25ss
        await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
        return newTodo;
    })

//27ms40ss
export const deleteTodo = createAsyncThunk(
    'todos/todoDeleted', async (todoId) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);//28ms58ss
        return todoId;//v903xx2
    });

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        //addTodo: {},//25ms01ss
        markComplete: (state, action) => {
            const todoId = action.payload;
            state.allTodos = state.allTodos.map(todo => {
                if (todo.id === todoId) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        },
        // deleteTodo(state, action) { }, //29ms27ss
        // todosFetched(state, action) { }, //16ms35ss
    },
    //18ms58ss
    extraReducers: {
        //get all todos
        [getTodos.pending]: (state, action) => { // 19ms29ss
            console.log('Fetching todos from backend...');
        },
        [getTodos.fulfilled]: (state, action) => { // 20ms18ss
            console.log('Done');
            state.allTodos = action.payload;
        },
        [getTodos.rejected]: () => { //20ms53ss
            console.log('Failed to get todos !!!');
        },
        // Add todo, 25ms01ss
        [addTodo.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload);
        },
        // delete Todo, 29ms27ss
        [deleteTodo.fulfilled]: (state, action) => {
            const todoId = action.payload;
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId);
        }
    }
})

// reducer
const todosReducer = todosSlice.reducer

// selector
const todosSelector = state => state.todosReducer.allTodos;

// action, 
export const {
    //addTodo, //26ms25ss
    markComplete,
    // deleteTodo, //27ms40ss
    // todosFetched, //16ms35ss
} = todosSlice.actions;

export { todosReducer, todosSelector };

