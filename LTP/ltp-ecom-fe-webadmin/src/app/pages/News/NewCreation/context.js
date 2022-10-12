import React from 'react';

export const NewsCreationContext = React.createContext();

export const initialState = {
  detail: {
    name: '',
    category: '',
    status: 0,
    scheduled_at: '',
    author: '',
    updated_at: '',
    desc: '',
    featurePublic: false,
    featurePrivate: false,
    content: '',
    thumbnail: '',
    nameEN: '',
    descEN: '',
    contentEN: '',
    title_seo: '',
    title_seo_en: '',
    description_seo: '',
    description_seo_en: '',
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