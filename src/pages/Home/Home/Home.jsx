import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import LogoMarque from "../LogoMarque/LogoMarque";
import Support from "../Support/Support";
import BeMerchant from "../BeMarchent/BeMerchant";
import HowItWorks from "../HowItWorks/HowItWorks";
import TestimonialSlider from "../Testimonial/TestimonialSlider";
import FrequentlyAsked from "../FAQ/FrequentlyAsked";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <LogoMarque></LogoMarque>
      <Support></Support>
      <BeMerchant></BeMerchant>
      <TestimonialSlider></TestimonialSlider>
      <FrequentlyAsked></FrequentlyAsked>
    </div>
  );
};

export default Home;
