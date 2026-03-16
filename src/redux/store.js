import {configureStore,combineReducers} from "@reduxjs/toolkit" 
import FilterReducer from "./features/filter/filterSlice"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
  skill:FilterReducer
})

const configurReducer = {
  key:"root",
  storage
}

const persistedReducer = persistReducer(configurReducer,rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck:false
    })
  }
})
export const persistor = persistStore(store);