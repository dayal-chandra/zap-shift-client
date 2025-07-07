const Support = () => {
  const services = [
    {
      title: "Fast Delivery",
      description:
        "We ensure your products reach their destination quickly and safely with our reliable logistics network.",
      image: "https://i.ibb.co/2qkXbDQ/delivery.png",
    },
    {
      title: "24/7 Support",
      description:
        "Our support team is available around the clock to help you with any issues or questions.",
      image: "https://i.ibb.co/mXvYwh9/support.png",
    },
    {
      title: "Global Reach",
      description:
        "We offer worldwide shipping options to expand your business beyond borders.",
      image: "https://i.ibb.co/NY8CjMR/global.png",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-10">
        Why Choose Us
      </h2>
      <div className="space-y-5">
        {services.map((service, index) => (
          <div
            data-aos="zoom-in-up"
            key={index}
            className="flex items-center p-6 border rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {/* Illustration */}
            <img
              src={service.image}
              alt={service.title}
              className="w-20 h-20 object-contain"
            />

            {/* Vertical Dashed Line */}
            <div className="border-l-2 border-dashed h-16 mx-4 border-gray-300"></div>

            {/* Text Content */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Support;
