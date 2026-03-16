"use client"
import React from 'react'
import {Provider} from "react-redux" 
import {store,persistor} from "@/redux/store"
import {PersistGate} from "redux-persist/integration/react"

import Loading from "@/app/loading"
const Layout = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
        
      </PersistGate>
    </Provider>
  )
}

export default Layout