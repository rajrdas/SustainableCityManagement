// frontend/src/reducers/index.js

import auth from './auth';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  auth
});