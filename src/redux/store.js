import { configureStore } from '@reduxjs/toolkit'
import { samespaceApi } from './services/samespaceApi'
import playerReducer from './features/playerSlice'

export const store = configureStore({
  reducer: {
    [samespaceApi.reducerPath]: samespaceApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(samespaceApi.middleware),
})
