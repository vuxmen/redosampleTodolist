
export const changeHeaderInputValue = (newTask) => {
    return {
        type: "CHANGE_INPUT", 
        payload: newTask
    }
}

export const changeEmailInputValue = (newEmail) => {
    return {
        type: "CHANGE_EMAIL",
        payload: newEmail
    }
}

export const changePasswordInputValue = (newPassword) => {
    return {
        type: "CHANGE_PASSWORD",
        payload: newPassword
    }
}