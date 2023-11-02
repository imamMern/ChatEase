import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Registration from './Pages/Registration/Registration.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Authentication/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import store from './Store'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/fogotpassword",
    element: <ForgotPassword/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,

  </React.StrictMode>,
)
