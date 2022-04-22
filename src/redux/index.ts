import {configureStore, combineReducers} from "@reduxjs/toolkit";
import loginInformationReducer from './loginInformationReducer'

const rootReducer = combineReducers({
    toolkit: loginInformationReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch