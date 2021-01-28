import { userAccount } from "../../userAccount";
import { actionTypes } from "../actionTypes";

export const authReducer = (
  state = { email: "", password: "", user: null, isLoginFail: false },
  action
) => {
    console.log(action);
  switch (action.type) {
    case "@@INIT": {
      return initState(state);
    }
    case actionTypes.CHANGE_EMAIL: {
      return {
        ...state,
        email: action.payload.newEmail,
      };
    }
    case actionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload.newPassword,
      };
    }
    case actionTypes.LOGIN: {
      return handleLogin(state, action.payload);
    }
    default:
      return state;
  }
};

const initState = (currentState) => {
  const userEmail = localStorage.getItem("authUserEmail");

  if (userEmail) {
    return {
      ...currentState,
      user: userAccount().find((user) => user.email === userEmail),
    };
  } else {
    return currentState;
  }
};

const handleLogin = (currentState, payload) => {
  const matchedUser = userAccount().find(
    (user) =>
      user.email === currentState.email &&
      user.password === currentState.password
  );

  if (matchedUser) {
    localStorage.setItem("authUserEmail", matchedUser.email);

    window.location.replace("/TodoList");

    return {
      ...currentState,
      email: "",
      password: "",
      isLoginFail: false,
      user: matchedUser,
    };
  } else {
    return {
      ...currentState,
      isLoginFail: true,
    };
  }
};
