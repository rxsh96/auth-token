import React from "react";
import Tilt from "react-parallax-tilt";
import shoppingCart from "./shopping-cart.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div>
      <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }}>
        <div className="Tilt-inner pa3">
          <img alt="logo" src={shoppingCart} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
