import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Navbar() {
  const slides = [
    {
      image: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
      title: "Welcome to EduLearn",
      description: "Interactive learning for modern students.",
      buttonText: "Get Started",
      buttonLink: "/start",
    },
    {
      image: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
      title: "Track Your Progress",
      description: "Personalized dashboards and performance tracking.",
      buttonText: "View Dashboard",
      buttonLink: "/dashboard",
    },
    {
      image:
        "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg",
      title: "Join a Community",
      description: "Connect with peers and mentors.",
      buttonText: "Explore",
      buttonLink: "/community",
    },
  ];

  return (
    <div className="w-full h-[70vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-center text-white px-4 max-w-2xl">
                <h1
                  style={{ fontSize: "30px", padding: "10px" }}
                  className="text-5xl font-bold mb-4"
                >
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl mb-6">{slide.description}</p>
                <a
                  href={slide.buttonLink}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
