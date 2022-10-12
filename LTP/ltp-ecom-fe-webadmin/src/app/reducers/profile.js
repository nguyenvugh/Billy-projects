export const ACTION_TYPE = {
  GET_PROFILE_REQUEST: "profile/GET_PROFILE_REQUEST",
  GET_PROFILE_SUCCESS: "profile/GET_PROFILE_SUCCESS",
  GET_PROFILE_ERROR: "profile/GET_PROFILE_ERROR",
};

const initialState = {
  profile: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;