import merchant from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div
      data-aos="fade-up"
      className=" bg-[#03373D] bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat rounded-4xl p-5 md:p-20 mb-10"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={merchant} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-white">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary text-black shadow-none rounded-full mr-4">
            Become a Merchant
          </button>
          <button className="btn btn-primary text-[#caeb66] hover:text-black btn-outline shadow-none rounded-full">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
