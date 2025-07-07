import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import customer from "../../../assets/customer-top.png";

const TestimonialSlider = () => {
  const testimonials = [
    {
      name: "Awlad Hossin",
      role: "Senior Product Designer",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      name: "Rasel Ahamed",
      role: "CTO",
      text: "Posture Pro has significantly improved my comfort during long working hours. It's easy to use and surprisingly effective.",
    },
    {
      name: "Nasir Uddin",
      role: "CEO",
      text: "Highly recommend Posture Pro for anyone dealing with back pain or poor posture. It's been a game-changer for our team.",
    },
    {
      name: "Sarah Khan",
      role: "Marketing Manager",
      text: "After using Posture Pro, my posture has improved and I feel less fatigued. Fantastic product!",
    },
    {
      name: "John Doe",
      role: "Software Engineer",
      text: "Posture Pro helps me stay comfortable during long coding sessions. A small investment for big health benefits.",
    },
    {
      name: "Emily Smith",
      role: "Fitness Coach",
      text: "I recommend Posture Pro to all my clients struggling with posture issues. It delivers real, visible results.",
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Header */}
        <div className="mb-8">
          <img src={customer} alt="boxes" className="mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#034b44] mb-2">
            What our customers are sayings
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            className="flex items-center"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((review, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                {({ isActive }) => (
                  <div
                    className={`transition-all duration-500 p-6 rounded-xl shadow-md max-w-sm w-full bg-white text-left ${
                      isActive
                        ? "scale-105 -mt-4 opacity-100"
                        : "scale-90 opacity-50"
                    }`}
                  >
                    <FaQuoteLeft size={30} className="text-[#068e79] mb-4" />
                    <p className="text-gray-700 mb-6">{review.text}</p>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-[#034b44]">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button className="custom-prev bg-white p-3 rounded-full shadow hover:bg-gray-100">
              <IoIosArrowBack size={20} className="text-[#034b44]" />
            </button>
            <button className="custom-next bg-[#c1e800] p-3 rounded-full shadow hover:bg-lime-300">
              <IoIosArrowForward size={20} className="text-[#034b44]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
