

export const emailReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGE_EMAIL' : {
            return action.payload;
        }
        default: return state;
    }
}