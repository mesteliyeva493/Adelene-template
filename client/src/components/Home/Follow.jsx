import React from "react";
import img1 from "../../img/01.jpg";
import img2 from "../../img/02.jpg";
import img3 from "../../img/03.jpg";
import img4 from "../../img/04.jpg";
import img5 from "../../img/05.jpg";
import img6 from "../../img/06.jpg";
import img7 from "../../img/07.jpg";
import img8 from "../../img/08.jpg";
import img9 from "../../img/09.jpg";
import img10 from "../../img/10.jpg";
import img11 from "../../img/11.jpg";
import img12 from "../../img/12.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
function Follow() {
  const photos = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];
  return (
    <>
      <section className="py-[100px] bg-[#F6F3EF]">
        <div className="text-center mb-10">
          <h2 className="text-center text-3xl font-normal text-[#BB4B2A] tracking-[4px] uppercase">
            ADALENE ON INSTAGRAM
          </h2>
          <p className="italic font-serif text-[#240c05] text-[18px]">
            @adeneshop
          </p>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={2} 
            loop={true}
            autoplay={{ delay: 3000 }} 
            navigation={true} 
            breakpoints={{
              768: { slidesPerView: 4 }, 
              1024: { slidesPerView: 6 }, 
            }}
            className="insta-slider"
          >
            {photos.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-square overflow-hidden cursor-pointer">
                  <img
                    src={image}
                    alt={`insta-${index}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="max-w-[1200px] mx-auto mt-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-[1px] bg-[#BC4C2A] mb-4"></div>
            <p className="italic font-serif text-gray-600 tracking-wide text-[16px]">
              Worldwide shipping
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-[1px] bg-[#BC4C2A] mb-4"></div>
            <p className="italic font-serif text-gray-600 tracking-wide text-[16px]">
              Easy 30 day returns
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-[1px] bg-[#BC4C2A] mb-4"></div>
            <p className="italic font-serif text-gray-600 tracking-wide text-[16px]">
              12 month warranty
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Follow;
