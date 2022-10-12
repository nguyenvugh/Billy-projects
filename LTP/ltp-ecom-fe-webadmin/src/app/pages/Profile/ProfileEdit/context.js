import React from 'react';

export const ProfileEditContext = React.createContext();

export const initialState = {
  detail: {
    username: '',
    fullname: '',
    national_id: '',
    group_id: '',
    sex: '',
    phone_number: '',
    address: '',
    thumbnail: 'https://i.pinimg.com/originals/6b/66/e8/6b66e84fdbecde15550f56346c01cf2c.jpg',
    password: '',
    old_password: '',
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