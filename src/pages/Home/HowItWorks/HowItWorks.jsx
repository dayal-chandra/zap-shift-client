import {
  FaTruckPickup,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaTruckPickup size={35} className="text-[#068e79]" />,
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaMoneyBillWave size={35} className="text-[#068e79]" />,
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaWarehouse size={35} className="text-[#068e79]" />,
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaBuilding size={35} className="text-[#068e79]" />,
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl text-left md:text-3xl font-bold text-[#034b44] mb-8">
          How it Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              data-aos="fade-up"
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="font-semibold text-[#034b44] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
