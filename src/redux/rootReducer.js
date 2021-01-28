import {combineReducers} from 'redux';
import {newTodoTask} from './reducer/newTodoTask';
import {authReducer} from './reducer/auth';

export default combineReducers({
    newTodoTask,
    auth: authReducer,
});

