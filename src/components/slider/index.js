import React from "react";
import Slider from "react-slick";

export default function SliderContainer(props) {

  var settings = {
    dots: props.dots ? props.dots : false,
    infinite: props.infinite ? props.infinite : true,
    speed: props.speed ? props.speed : 300,
    slidesToShow: props.slidesToShow ? props.slidesToShow : 1,
    slidesToScroll: props.slidesToScroll ? props.slidesToScroll : 1,
    autoplay: props.autoplay ? props.autoplay : false,
    pauseOnHover: props.pauseOnHover ? props.pauseOnHover : true,
    responsive: props.responsive ? props.responsive : null,
    rows: 1
  };

  return (
    <Slider {...settings}>
      {props.children}
    </Slider>
  );
}
