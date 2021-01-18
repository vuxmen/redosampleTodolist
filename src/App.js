import React, {useEffect, useState } from "react";
import _ from "lodash";
import CompleteTask from "./components/CompleteTask";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import {getTodo, addTodo, markTaskComplete, markTaskFavorite} from "./AppService";
import "./App.css";

export default function App() {

  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loadingCount, setCount] = useState(0);
  
  const convertDate = time => new Date(time).getTime();
  useEffect( 
    async () => {
      try {
        const response = await getTodo();
        setTaskList(response.data.data.map(task => {
          return {
            ...task,
            createdDate: convertDate(task.createdDate),
            completedDate: convertDate(task.completedDate),
            isFavorite: (task.isFavorite) ? 1 : 0
          }
        }));
        setIsError(false);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsError(true);
      } 
    }, [loadingCount]
  );

  const [completedList, incompletedList] = _.partition(
    taskList,
    e => e.isCompleted
  );

  const handleAddTodo = async (newTaskName) => {
    try {
      await addTodo(newTaskName);
      setIsLoading(true);
      setIsError(false);
      setCount(loadingCount + 1);
     
    } catch (err) {
      console.log(err);
      setIsError(true);
    }

  }

  const handleChangeCompleteStatus = async (taskId, newStatus) => {
    try {
      await markTaskComplete(taskId, newStatus);
      setIsLoading(true);
      setIsError(false);
      setCount(loadingCount + 1);
    } catch (err) {
      console.log(err);
    }
  }
    
  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      await markTaskFavorite(taskId, newStatus);
      setIsLoading(true);
      setIsError(false);
      setCount(loadingCount + 1);
    } catch (err) {
      console.log(err);
    } 
  }

  // setTaskList(
  //   taskList.map(task => 
  //     (task.id = taskId) ? {
  //       ...task,
  //       isFavorite: newStatus,
  //     } : task
  //   )
  // );
  // setTaskList(
    //   taskList.map(task => 
    //     (task.id = taskId) ? {
    //       ...task,
    //       isCompleted: newStatus,
    //       completedDate: new Date().getTime(),
    //     } : task
    //   )
    // );

  const renderContent = () => {
    return isLoading ? 'Loading...' : (
      <div className = "App">
        <Header 
        onAddTodo = {handleAddTodo}
        />
        <TaskList
          incompletedList = {incompletedList}
          onChangeCompleteStatus = {handleChangeCompleteStatus}
          onChangeFavoriteStatus = {handleChangeFavoriteStatus}
        />
        <CompleteTask
          completedList = {completedList}
          onChangeCompleteStatus = {handleChangeCompleteStatus}
          onChangeFavoriteStatus = {handleChangeFavoriteStatus}
        />
      </div>
    );
  }

  const setLoadingCount = () => {
    setIsError(false);
    setIsLoading(true);
    setCount(loadingCount + 1);
  }

  const renderErrorContent = () => {
    return (
      <div>
        <div>"error"</div>
        <button onClick = {() => {setLoadingCount()}}>ReLoad App</button>
      </div>
    );
  }

  return (
      isError ? renderErrorContent() : renderContent()
  );
}
