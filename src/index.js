import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component'

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


const Shop=()=>{
  return <h1>Hi I am the Shop</h1>
};

const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path:'shop',
        element: <Shop/>
      },
      {
        path: 'sign-in',
        element: <SignIn/>
      }
      
    ]
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
