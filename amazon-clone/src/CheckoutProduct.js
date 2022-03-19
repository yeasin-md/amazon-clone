import { Star } from '@material-ui/icons';
import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
function CheckoutProduct({ id, image, title, price, rating, hidebtn }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    //removing the basket--
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img src={image} className="checkoutProduct__image" alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small> <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <Star />
              </p>
            ))}
        </div>
        {!hidebtn && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
