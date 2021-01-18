import React, { useState } from "react";
import classes from "./Header.module.css";

export default function Header({onAddTodo}) {
  const [currentItem, setCurrentItem] = useState('');

  const handleChange = (value) => setCurrentItem(value); 

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && currentItem) {
      onAddTodo(currentItem);
      setCurrentItem('');
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


