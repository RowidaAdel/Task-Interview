import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import CategoryBox from "../CategoryBox/CategoryBox";

export default function Slider() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-[1200px] mx-auto">
      <div className="md:col-span-2 rounded-lg overflow-hidden shadow-lg aspect-[16/9]">
        <Swiper modules={[Autoplay, Pagination, EffectFade]} autoplay={{delay:3500,disableOnInteraction:false}} pagination={{clickable:true}} effect="fade" loop className="w-full h-full">
          <SwiperSlide><CategoryBox img={"https://watermark.lovepik.com/photo/20211126/large/lovepik-clothing-store-picture_501098963.jpg"} discount={30} title="New Collection" price="250"/></SwiperSlide>
          <SwiperSlide><CategoryBox img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZuRbg-Yxf9SOeDcDyMk9MVd2XWxWSQzMNgH31qBxOmeAOST9o5BYacEP-84qdSlOK6M&usqp=CAU"} discount={15} title="Best Clothes" price="150"/></SwiperSlide>
          <SwiperSlide><CategoryBox img={"https://cdn.alweb.com/thumbs/altaswieq/article/fit710x532/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%84%D9%85%D8%AD%D9%84-%D9%85%D9%84%D8%A7%D8%A8%D8%B3.jpg"} discount={40} title="Best Brands" price="300"/></SwiperSlide>
        </Swiper>
      </div>
      <div className="hidden md:flex flex-col gap-6">
        <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group aspect-[16/9]">
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKnoO9C8MW5ch6SYqxRR1peElQRV5SYuek1A&s"} alt="Best" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group aspect-[16/9]">
          <img src={"https://lh4.googleusercontent.com/proxy/_xN13Eq_LmuuF3Fcc7u7m_6-h44ZgdbAO6LiuyDCJNO6W1zzMJGqJ9Z_iNSXNqXyj2_rN6_3WGk_sYyMFKcIxac4pRdhlABnMpWjCzwi-4VJy_uFVTG0HJ3-aBFM77S2QsjNrALctWX4wY1ByGghZdyQRMAkjw"} alt="Best" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        </div>
      </div>
    </div>
  );
}