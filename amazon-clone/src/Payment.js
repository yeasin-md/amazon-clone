import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';

import MyLocation from './MyLocation';
import './Payment.css';

import { useStateValue } from './StateProvider';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>
              <MyLocation />
            </p>
          </div>
        </div>

        {/* review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>

        {/* payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <Link to="/confirm-order">
            <button>Confirm Order</button>
          </Link>
          <div className="payment__details">
            {/* stripe section */}

            <Link to="/">
              <button>Back to shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
