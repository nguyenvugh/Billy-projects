import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import categoryReducer from 'src/sections/@dashboard/category-enterprise/category.slice';
import categoryPolicyReducer from 'src/sections/@dashboard/category/categoryPolicy.slice';
import eventReducer from 'src/sections/@dashboard/event/event.slice';
import adminAcountReducer from 'src/sections/@dashboard/register-new-account/adminAccount.slice';
import policyReducer from 'src/sections/@dashboard/policy/policy.slice';
import documentReducer from 'src/sections/@dashboard/documents/document.slice';
import loginReducer from 'src/sections/auth/login/login.slice';
import articleReducer from 'src/sections/@dashboard/article/articleSlice';
import aboutUsReducer from 'src/sections/@dashboard/about-us/about-us.slice';
import authorizationReducer from 'src/sections/@dashboard/authorization/authorizationSlice';
import authLoginReducer from 'src/sections/auth/login/auth.slice'
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin'],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  category: categoryReducer,
  categoryPolicy: categoryPolicyReducer,
  event: eventReducer,
  policy: policyReducer,
  document: documentReducer,
  login: loginReducer,
  addAccount: adminAcountReducer,
  article: articleReducer,
  aboutUs: aboutUsReducer,
  authorization: authorizationReducer,
  authLogin :authLoginReducer
});

export { rootPersistConfig, rootReducer };
