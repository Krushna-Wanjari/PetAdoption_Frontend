import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import pet1 from "../assets/hero/pet1.jpg";
import pet2 from "../assets/hero/pet2.jpg";
import pet3 from "../assets/hero/pet3.jpg";
import pet4 from "../assets/hero/pet4.jpg";
import pet5 from "../assets/hero/pet5.jpg";

const images = [pet1,pet2,pet3,pet4,pet5];

function ImageSlider() {
  return (
    <div className="w-full">
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 2500 }}
    loop={true}
  >
    {images.map((img, index) => (
      <SwiperSlide key={index}>
        <img
           src={img}
           alt="Pet"
           className="w-full h-112.5 object-cover rounded-3xl shadow-2xl"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  );
}

export default ImageSlider;