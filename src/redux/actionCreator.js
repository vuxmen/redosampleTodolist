
export const addNewtodo = (newTask) => {
    return {
        type: "ADD_TODO", 
        payload: newTask
    }
}