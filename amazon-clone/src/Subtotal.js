import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
function Subtotal() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              Subtotal (<strong>{basket?.length}</strong> item/s):{' '}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      {user ? (
        <button onClick={e => history.push('/payment')}>
          Proceed to Checkout
        </button>
      ) : (
        <>
          {' '}
          <p style={{ color: '#be0000' }}>
            Please sign in first to proceed for checkout!
          </p>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <p style={{ textAlign: 'center',}}>
              Sign In/ Sign Up
            </p>
          </Link>
        </>
      )}
    </div>
  );
}

export default Subtotal;
