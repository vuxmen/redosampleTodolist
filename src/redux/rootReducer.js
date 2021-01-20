import {combineReducers} from 'redux';
import {newTodoTask} from './reducer/newTodoTask';
export default combineReducers({newTodoTask: newTodoTask});

