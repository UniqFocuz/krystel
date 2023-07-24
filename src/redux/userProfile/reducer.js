import { USER_PROFILE } from "./actionTypes";

const initialState = {
  "isAuthenticated" : false,
  "isMFAEnabled" : false
};
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_PROFILE:
        return { ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;