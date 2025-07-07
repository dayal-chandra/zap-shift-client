import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/casio.png";
import logo3 from "../../../assets/brands/moonstar.png";
import logo4 from "../../../assets/brands/randstad.png";
import logo5 from "../../../assets/brands/amazon_vector.png";
import logo6 from "../../../assets/brands/start.png";
import logo7 from "../../../assets/brands/start-people 1.png";

const LogoMarque = () => {
  return (
    <div data-aos="fade-up">
      <h1 className="text-2xl text-center font-semibold py-4">
        Trusted By Leading Brands
      </h1>
      <div className="py-3 my-5">
        <Marquee gradient={false} speed={50} direction="left">
          <img src={logo1} alt="Sponsor 1" className="mx-8 h-5" />
          <img src={logo2} alt="Sponsor 2" className="mx-8 h-5" />
          <img src={logo3} alt="Sponsor 3" className="mx-8 h-5" />
          <img src={logo4} alt="Sponsor 4" className="mx-8 h-5" />
          <img src={logo5} alt="Sponsor 4" className="mx-8 h-5" />
          <img src={logo6} alt="Sponsor 4" className="mx-8 h-5" />
          <img src={logo7} alt="Sponsor 4" className="mx-8 h-5" />
        </Marquee>
      </div>
    </div>
  );
};

export default LogoMarque;
