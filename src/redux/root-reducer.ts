import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
