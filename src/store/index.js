import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from './reducer/todosSlice';

/* store, part 6 */
const store = configureStore({
    reducer: {
        todosReducer,
    }
});


export default store;
