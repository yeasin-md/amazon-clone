import React, { useEffect, useState } from 'react';
import './MyPayment.css';
import axios from './axios';
import { getBasketTotal } from './reducer';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import MyLocation from './MyLocation';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Zoom from 'react-reveal/Zoom';
import { db } from './firebase';
function MyPayment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret**
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log(`client secret ${clientSecret}`);
  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);
    //some stripe stuffs--
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET',
        });
        history.replace('/orders');
      });
  };
  const handleChange = event => {
    //listen the changes in the card element
    //and also display any errors in the card acc. to cutomer types the details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="mypayment">
      <Zoom>
        <div className="card__details">
          <h4>Card Details:</h4>
          <div className="">
            <form form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
              <CardElement onChange={handleChange} />
              <div
                className="payment__priceContainer"
                style={{ marginTop: '12px' }}
              >
                <CurrencyFormat
                  renderText={value => (
                    <>
                      <p>
                        Subtotal (<strong>{basket?.length}</strong> item/s):{' '}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <div className="card__button">
                  <button
                    className=""
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                  </button>
                </div>
              </div>
              {/* errors */}
              {error && <div style={{ color: '#be0000' }}>{error}</div>}
            </form>
          </div>

          <div className="address">
            <h4>Order placed to:</h4>
            <p>{user?.email}</p>
            <MyLocation />
          </div>
          <Link to="/payment" style={{ textDecoration: 'none' }}>
            <p className="backtoshopFromCard">
              <ArrowBackRoundedIcon style={{ marginBottom: '-6.2px' }} />
              Review Cart
            </p>
          </Link>
        </div>
      </Zoom>
    </div>
  );
}

export default MyPayment;
