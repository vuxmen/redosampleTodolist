

export const newTodoTask = (state = '', action) => {
    switch(action.type) {
        case 'ADD_TODO' : {
            return action.payload;
        }
        default: return state;
    }
}