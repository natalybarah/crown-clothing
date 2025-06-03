import React, {lazy, Suspense} from 'react';
import {useEffect, Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './global.styles';
import Navigation from './routes/navigation/navigation.component'
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
import Spinner from './components/spinner/spinner.component';
import { stripePromise } from './utils/stripe/stripe-utils';


const Home= lazy(()=>import('./routes/home/home.component'));
const Authentication= lazy(()=> import('./routes/authentication/authentication.component'));
const Checkout= lazy(()=> import('./routes/checkout/checkout.component'));
const ModalPopupPay= lazy(()=> import('./components/modals/modal-popup-pay'));
const Shop= lazy(()=>import('./routes/shop/shop.component'));

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element:  <Suspense fallback={<Spinner></Spinner>}>
                    <Home/>
                  </Suspense>
      },
      {
        path:'shop/*',
        element: <Suspense fallback={<Spinner></Spinner>}>
                    <Shop/>
                </Suspense>
      },
      {
        path: 'auth',
        element:  <Suspense fallback={<Spinner></Spinner>}>
                    <Authentication/>
                  </Suspense> 
      },
      {
        path: 'checkout',
        element:  <Suspense fallback={<Spinner></Spinner>}>
                    <Checkout/>
                  </Suspense>,
        children: [
          {
            path: 'popuppay',
            element:  <Suspense fallback={<Spinner></Spinner>}>
                        <ModalPopupPay/>
                      </Suspense> 
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

  return(  
    <Fragment>
       <GlobalStyles></GlobalStyles>
       <RouterProvider router={router} />
    </Fragment>
  )
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

