import Slider from "react-slick";
import { useState, useEffect } from "react";
import HomeLoading from "../loading/homeloading";

const HomeSlider = () => {

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    dots: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      {
        !isLoading ? (
          <Slider {...settings}>
            <img className="beauty" src="/images/bitmap.png" alt="beauty" />
            <img className="beauty" src="/images/bitmap.png" alt="beauty" />
            <img className="beauty" src="/images/bitmap.png" alt="beauty" />
          </Slider>
        )
          : <HomeLoading />
      }

    </React.Fragment>

  )
}


export default HomeSlider;