import React, { useEffect, useState } from "react";
import _ from "lodash";
import CompleteTask from "./CompleteTask";
import Header from "./Header";
import TaskList from "./TaskList";
import { getTodo, markTaskComplete, markTaskFavorite } from "./TodoService";
import { Redirect, useHistory } from "react-router-dom";
import style from "./TodoList.module.css";
import { useSelector } from "react-redux";

export default function TodoList() {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loadingCount, setCount] = useState(0);
  const convertDate = (time) => new Date(time).getTime();
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await getTodo();
        setTaskList(
          response.data.data.map((task) => {
            return {
              ...task,
              createdDate: convertDate(task.createdDate),
              completedDate: convertDate(task.completedDate),
              isFavorite: task.isFavorite ? 1 : 0,
            };
          })
        );
        setIsError(false);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    };

    asyncFunc();
  }, [loadingCount]);

  const [completedList, incompletedList] = _.partition(
    taskList,
    (e) => e.isCompleted
  );

  const handleChangeCompleteStatus = async (taskId, newStatus) => {
    try {
      setIsLoading(true);
      setIsError(false);
      await markTaskComplete(taskId, newStatus);
      setCount(loadingCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      setIsLoading(true);
      setIsError(false);
      await markTaskFavorite(taskId, newStatus);
      setCount(loadingCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const renderContent = () => {
    return isLoading ? (
      "Loading..."
    ) : (
      <div className={style.todoList}>
        <Header onChangeLoading={setLoadingCount} userName={currentUser.name} />
        <TaskList
          incompletedList={incompletedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <CompleteTask
          completedList={completedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <button onClick={() => history.push('/')}>Log out</button>
      </div>
    );
  };

  const setLoadingCount = () => {
    setIsError(false);
    setIsLoading(true);
    setCount(loadingCount + 1);
  };

  const renderErrorContent = () => {
    return (
      <div>
        <div>"error"</div>
        <button
          onClick={() => {
            setLoadingCount();
          }}
        >
          ReLoad App
        </button>
      </div>
    );
  };

  return isError ? renderErrorContent() : renderContent();
}
