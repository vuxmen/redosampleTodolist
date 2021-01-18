import React from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import classes from "./TaskListItems.module.css";

export default function TaskListItems({
  task,
  onChangeCompleteStatus,
  onChangeFavoriteStatus
  }) {

  return (
    <li>
      <div className={classes.wrapItem}>
        <div className={classes.wrap}>
          <input
            key = {task.id}
            type = "checkbox"
            checked = {task.isCompleted}
            onChange = {() => onChangeCompleteStatus(task.id, !task.isCompleted)}
          />
          <label>{task.taskName}</label>
        </div>
        {task.isCompleted ? (
          <span></span>
          ) : (task.isFavorite === 1) ? (
                <StarFilled 
                  onClick = {() => onChangeFavoriteStatus(task.id, task.isFavorite = (task.isFavorite === 0) ? true : false)}
                  style = {
                    {color: '#ffcc00'}
                  }
                />
              ) : (
                <StarOutlined 
                  onClick = {() => onChangeFavoriteStatus(task.id, task.isFavorite = (task.isFavorite === 0) ? true : false)}
                />
              )
        }
      </div>
    </li>
  );
}

