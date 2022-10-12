import React from 'react';

export const AdminCreationContext = React.createContext();

export const initialState = {
  detail: {
    username: '',
    group: 0,
    status: 0,
    fullname: '',
    sex: 0,
    national_id: '',
    phone_number: '',
    address: '',
    password: '',
    confirmPassword: '',
  },
}

export const reducer = (state, action) => {
  switch(action.type) {
    case 'updateDetail': 
      return {
        ...state, 
        detail: action.payload
      };
    case 'updateDetailInput':
      return {
        ...state,
        detail: {
          ...state.detail,
          [action.payload.key]: action.payload.value
        }
      }
    default:
      return state;
  }
}