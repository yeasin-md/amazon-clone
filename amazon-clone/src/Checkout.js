import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Subtotal from './Subtotal';
import Slide from 'react-reveal/Slide';
function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout__ad"
        />
        <div className="">
          <h3 style={{ marginLeft: '10px' }}>
            {user ? `Hello, ${user.email}` : 'Hello, Guest'}
          </h3>
          <h3 className="checkout__title">
            Your Shopping Basket with{' '}
            <ShoppingCartIcon
              className="basketIcon"
              style={{ marginBottom: '-4px' }}
            />
            <span
              className=""
              style={{
                backgroundColor: '#f08804',
                width: '35px',
                height: '35px',
                paddingLeft: '7px',
                paddingRight: '7px',
                paddingTop: '-2px',
                borderRadius: '50%',
                fontWeight: '700',
                color: '#fff',
              }}
            >
              {basket?.length}
            </span>{' '}
            items:
          </h3>

          {basket.map(item => (
            <Slide left>
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                
              />
            </Slide>
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
