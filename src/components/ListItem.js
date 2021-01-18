import React from "react";
import TaskListItems from "./TaskListItems";
import classes from "./ListItem.module.css";

export default function ListItem({
  listName,
  renderedItem,
  onChangeCompleteStatus,
  onChangeFavoriteStatus
  }) { 
  return (
    <section className={classes.listTask}>
      <h2>{listName}</h2>
      <ul>
        {renderedItem.map(task =>
          <TaskListItems 
            key = {task.id}
            task = {task}
            onChangeCompleteStatus = {onChangeCompleteStatus}
            onChangeFavoriteStatus = {onChangeFavoriteStatus}
          />
        )}
      </ul>
    </section>
  );
}
