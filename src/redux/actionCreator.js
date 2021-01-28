import { actionTypes } from "./actionTypes";

export const changeHeaderInputValue = (newTask) => {
  return {
    type: actionTypes.CHANGE_INPUT,
    payload: {
      newTask,
    },
  };
};

export const changeEmailInputValue = (newEmail) => {
  return {
    type: actionTypes.CHANGE_EMAIL,
    payload: {
      newEmail,
    },
  };
};

export const changePasswordInputValue = (newPassword) => {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    payload: {
      newPassword,
    },
  };
};

export const login = () => ({
    type: actionTypes.LOGIN,
    payload: {}
});

export const logout = () => ({
    type: actionTypes.LOGIN,
    payload: {}
});
