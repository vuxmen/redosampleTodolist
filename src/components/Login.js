import React,  {useState} from 'react';
import style from './Login.module.css';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {changeEmailInputValue, changePasswordInputValue} from '../redux/actionCreator';
import {userAccount} from '../userAccount';


export default function Login() {
    const [failStatus, setFailStatus] = useState('');
    const email = useSelector(state => state.emailReducer);
    const password = useSelector(state => state.passwordReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleCheckEmail = (value) => {
       if (userAccount().find(user => user.email === value)) {
        dispatch(changeEmailInputValue(value));
        setFailStatus('');
       } 
       else if (value === '') {
        setFailStatus('');
        return
       }
       else setFailStatus('* Email này chưa được đăng ký, vui lòng nhập lại');
    }
    const handleCheckPassword = (value) => {
        if (userAccount().find(user => user.email === email).password === value) {
            dispatch(changePasswordInputValue(value));
            setFailStatus('');
        } 
        else if (value === '') {
            setFailStatus('');
            return
        }
        else setFailStatus('* Sai password, vui lòng nhập lại');
    }

    const handleLinktoTodoList = () => {
       if (email !== '' && password !== '' && failStatus === '') 
        history.push(`/TodoList/${userAccount().find(user => user.email === email).name}`);
    }
    return (
        <div className = {style.container}>
            <div className = {style.login}>
                <h1>Welcome TodoList</h1>
                <input type="text" placeholder="Type your email..." onBlur = {e => handleCheckEmail(e.target.value)}/>
                <input type="text" placeholder="Type your password..." onBlur = {e => handleCheckPassword(e.target.value)}/>
                <button onClick = {handleLinktoTodoList}>Login</button>
                <span>{failStatus}</span>
            </div>
        </div>
    );
}

