import { USER_PROFILE } from "./actionTypes";

export const setUserProfile = (user_profile) => ({
    type: USER_PROFILE,
    payload: user_profile,
  });