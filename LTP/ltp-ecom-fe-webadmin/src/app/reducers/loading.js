const initialState = {
  loading: false,
  errorMessage: [],
}

export const ACTION_TYPE = {
  SET_ERROR_MESSAGE: "loading/SET_ERROR_MESSAGE",
};

const loadingReducer = (state = initialState, action) => {
  const { type } = action;

  if (type === ACTION_TYPE.SET_ERROR_MESSAGE) {
    return {
      ...state,
      errorMessage: action.payload,
    };
  }

  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);

  if (!matches) return state;

  const [, , requestState] = matches;
  if (requestState === "ERROR" && action.payload) {
    return {
      ...state,
      errorMessage: [...state.errorMessage, action.payload],
      loading: false,
    };
  }

  return {
    ...state,
    loading: requestState === "REQUEST",
  };
};

export default loadingReducer;
