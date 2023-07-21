import { USER_PROFILE } from "./actionTypes";

const initialState = {};
  
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