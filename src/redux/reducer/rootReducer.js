import { combineReducers } from "redux";
import userReducer from "../userProfile/reducer";

const rootReducer = combineReducers({
    userReducer,
})

export default rootReducer