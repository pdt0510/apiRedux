// part 6
import { useRef, useState } from 'react';
import { addTodo } from "../store/reducer/todosSlice";
import { useDispatch } from "react-redux"

const TodoForm = () => {
    const [title, setTitles] = useState('');
    const dispatch = useDispatch();
    const myRef = useRef();

    const changeTitle = (event) => {
        setTitles(event.target.value);
    }

    const addSingleTodo = event => {
        event.preventDefault();
        dispatch(addTodo(title));
        setTitles('');
        myRef.current.focus();
    }

    return (
        <div>
            <form onSubmit={addSingleTodo}>
                <input
                    ref={myRef}
                    type="text"
                    value={title}
                    onChange={changeTitle} />
                <input type="submit" value="Add a note" />
            </form>
        </div>
    )
}

export default TodoForm;
