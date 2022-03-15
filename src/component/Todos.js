
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import {
    todosSelector,
    markComplete,
    deleteTodo,
    getTodos,
} from "../store/reducer/todosSlice";
import { useEffect } from "react";

//part 6
const Todos = () => {
    const todos = useSelector(todosSelector);
    const dispatch = useDispatch();

    const toggleTodoCompleted = todoId => {
        dispatch(markComplete(todoId));
    }

    const deleteSingleTodo = todoId => {
        dispatch(deleteTodo(todoId));
    }

    useEffect(() => {
        //send reuest to json placeholder -> dispatch, 
        dispatch(getTodos());
    }, [dispatch])

    return (
        <div className="todo-list">
            <TodoForm />
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}
                        className={todo.completed ? 'completed' : ''}
                    >{todo.title}

                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={toggleTodoCompleted.bind(this, todo.id)} />

                        <button
                            onClick={deleteSingleTodo.bind(this, todo.id)}
                        >Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todos;
