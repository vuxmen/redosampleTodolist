

export const passwordReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGE_PASSWORD' : {
            return action.payload;
        }
        default: return state;
    }
}