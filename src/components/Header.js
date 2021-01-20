import React, { useState } from "react";
import classes from "./Header.module.css";
import {addTodo} from "./../AppService";
import {useSelector, useDispatch} from 'react-redux';
import {addNewtodo} from '../redux/actionCreator';

export default function Header({setLoadingCount}) {
  const currentItem = useSelector(state => state.newTodoTask);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(addNewtodo(value)); 
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && currentItem) {
      console.log(currentItem);
      dispatch(addNewtodo(''));
      handleAddTodo(currentItem);
    }
  }

  const handleAddTodo = async (newTaskName) => {
    try {
      await addTodo(newTaskName);
      setLoadingCount();
    } catch (err) {
      console.log(err);
    }

  }


  return (
    <header className={classes.heading}>
      <h1>Tasks</h1>
      <input
        type = "text"
        value = {currentItem}
        onChange = {e => handleChange(e.target.value)}
        onKeyDown = {e => handleKeyDown(e)}      
      />
    </header>
  );
}


