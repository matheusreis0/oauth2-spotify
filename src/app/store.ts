import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authorizationReducer from '../features/authorization/authorizationSlice';
import spotifyExampleSlice from '../features/spotifyExample/spotifyExampleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authorization: authorizationReducer,
    spotifyExample: spotifyExampleSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
