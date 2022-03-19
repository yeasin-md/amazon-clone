import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import LogIn from './LogIn';
import Footer from './Footer';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import MyPayment from './MyPayment';
import Orders from './Orders';

const promise = loadStripe(
  'pk_test_51Iw2cJFAjaI8fo2HNtp4gRjzQYCd55jzpujN3jxR5qKdpVQiNn4oyGDS307QeCCNawgkIACIiyyqOOSUMvpKsCAC00OB9OvvJp'
);
function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  // useEffect(() => {
  //   if (basket) {
  //     dispatch({
  //       type: 'ADD_TO_BASKET',
  //       basket: [basket.item],
  //     });
  //   } else {
  //     dispatch({
  //       type: 'ADD_TO_BASKET',
  //       basket: [],
  //     });
  //   }
  // }, []);
  useEffect(() => {
    //will only run once when the app  components loads
    auth.onAuthStateChanged(authUser => {
      console.log('the user is', authUser);

      if (authUser) {
        //the user just logged in / was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LogIn />
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Payment />
            <Footer />
          </Route>
          <Route path="/confirm-order">
            {/* <Header /> */}
            <Elements stripe={promise}>
              <MyPayment />{' '}
            </Elements>
            {/* {user ? (
             
            ) : (
              'plx sign in first'
            )} */}

            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
