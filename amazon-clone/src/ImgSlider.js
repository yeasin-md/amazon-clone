import React from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function ImgSlider() {
  let settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <img src="/images/banner1.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="/images/banner2.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="/images/banner3.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="/images/banner4.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="/images/banner5.jpg" alt="" />
      </Wrap>
    </Carousel>
  );
}

export default ImgSlider;
const Carousel = styled(Slider)`
  // margin-top: 5px;
  // margin-bottom: 5px;
  // margin-left: 33px;
  // margin-right: 33px;

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button::before {
    color: white;
  }
  .slick-list {
    overflow: visible;
  }
  button {
    z-index: 1;
    margin-left: 33px;
    margin-right: 33px;
    size: 80px;
  }
`;
const Wrap = styled.div`
  img {
    // border: 4px solid transparent;
    width: 100%;
    height: 100%;
    margin-bottom: -373px;
    min-height: 140px;
    z-index: -1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgb(0, 0, 0, 0));
    // box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    //   rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: 300ms;
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    img {
      margin-bottom: -243px;
    }
  }
  @media (max-width: 770px) {
    img {
      margin-bottom: -200px;
    }
  }
  @media (max-width: 550px) {
    img {
      margin-bottom: -100px;
    }
  }
`;
