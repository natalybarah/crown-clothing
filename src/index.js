import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component'
import ModalPopupPay from './components/modals/modal-popup-pay';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Provider} from 'react-redux'
import { store, persistor } from './store/store';
import { checkUserSession } from './store/user/user.action';
import {useDispatch} from 'react-redux'
//import {PersistGate} from 'redux-persist/integration/react';
import {Elements} from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe-utils';

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
        path:'shop/*',
        element: <Shop/>
      },
      {
        path: 'auth',
        element: <Authentication/>
      },
      {
        path: 'checkout',
        element: <Checkout/>,
        children: [
          {
            path: 'popuppay',
            element: <ModalPopupPay/>
          }
        ]
      },
    ]
  }
]);


const App= ()=>{
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return <RouterProvider router={router} />
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <Provider store={store}>  
        {/*<PersistGate loading={null} persistor={persistor}>*/}
          <Elements stripe={stripePromise}>
            <App>
            </App>  
          </Elements>
        {/*</PersistGate>*/}    
      </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

