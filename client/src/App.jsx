import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux' // Redux-u bura gətiririk
import router from './router/Router.jsx'
import store from './app/Store.js'

function App() {
  return (
    <Provider store={store}>
      
      <Toaster position="top-right" />
      
      <RouterProvider router={router} />
      
    </Provider>
  )
}

export default App