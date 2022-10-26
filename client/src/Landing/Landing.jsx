import "./landing.css";
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import descuento1 from "../../assets/imageOne.jpg";
import descuento2 from "../../assets/imageTwo.jpg";
import descuento3 from "../../assets/imageThree.jpg";

function Landing() {
  return (
    <div className="virtualBody">
      <Carousel
        showStatus={true}
        showIndicators={true}
        showThumbs={false}
        showArrows={true}
        width={"100%"}
        className="virtualBody2"
        emulateTouch={true}
        infiniteLoop={true}
        transitionTime={500}
        autoPlay={true}
        dynamicHeight={false}
      >
        <div>
          <img src={descuento1} className="imgCarrousel" />
          {/*<p className="legend">Legend 1</p>*/}
        </div>
        <div>
          <img src={descuento2} className="imgCarrousel" />
          {/*<p className="legend">Legend2</p>*/}
        </div>
        <div>
          <img src={descuento3} className="imgCarrousel" />
          {/*<p className="legend">Legend 3</p>*/}
        </div>
      </Carousel>
    </div>
  );
}

export default Landing;
