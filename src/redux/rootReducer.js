import {combineReducers} from 'redux';
import {newTodoTask} from './reducer/newTodoTask';
import {emailReducer} from './reducer/email';
import {passwordReducer} from './reducer/password';

export default combineReducers({
    newTodoTask,
    emailReducer,
    passwordReducer
});

