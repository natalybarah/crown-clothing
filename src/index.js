import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
import {UserProvider} from './contexts/user.context';
import {ProductsProvider} from './contexts/products.context';
import Shop from './routes/shop/shop.component';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CartContextProvider } from './contexts/cart.context';



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
        path: 'auth',
        element: <Authentication/>
      }
      
    ]
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <UserProvider>
        <ProductsProvider> 
          <CartContextProvider>
            <RouterProvider router={router} />
         </CartContextProvider>
        </ProductsProvider> 
     </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//the user provider cant have access to its children the product provider can fetch and grab the data from the user provider