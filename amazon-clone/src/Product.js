import { Star, StarBorder } from '@material-ui/icons';
import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <>
      <Zoom>
        <div className="product">
          <div className="product__info">
            <p>{title}</p>
            <p className="product__price">
              <small>$</small>
              <strong>{price}</strong>
            </p>
            <div className="product__rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <p>
                    <Star />
                  </p>
                ))}
            </div>
          </div>
          {/* <a href={`/product/${id}`}> */}
          <img src={image} alt="" />
          {/* </a> */}

          <button onClick={addToBasket}>Add to Basket</button>
        </div>
      </Zoom>
    </>
  );
}

export default Product;
