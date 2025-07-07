import {
  FaTruckFast,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaTruckFast className="text-3xl text-[#1c7714]" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt className="text-3xl text-[#1c7714]" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse className="text-3xl text-[#1c7714]" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-3xl text-[#1c7714]" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-3xl text-[#1c7714]" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaArrowRotateLeft className="text-3xl text-[#1c7714]" />,
  },
];

export default function Services() {
  return (
    <section
      className="py-16 bg-[#03373D] rounded-3xl my-10"
      data-aos="zoom-in-up"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-white text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-white max-w-2xl mx-auto mb-12">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div
          data-aos="zoom-in-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service, index) => (
            <div
              data-aos="fade-up"
              key={index}
              className="p-6 bg-white rounded-2xl hover:bg-[#CAEB66] shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
