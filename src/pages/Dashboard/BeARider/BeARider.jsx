import { useForm } from "react-hook-form";
import warehouse from "../../Coverage/branchesData.json";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Extract unique region names
  const uniqueRegions = [...new Set(warehouse.map((item) => item.region))];

  // Watch selected region
  const selectedRegion = watch("region");

  // Get covered areas (districts) based on selected region
  const getCoveredAreas = (region) => {
    const branch = warehouse.find((b) => b.region === region);
    return branch ? branch.covered_area : [];
  };

  const onSubmit = async (data) => {
    const riderData = {
      name: user?.displayName,
      email: user?.email,
      age: data.age,
      phone: data.phone,
      nationalId: data.nationalId,
      bikeRegNumber: data.bikeRegNumber,
      bikeBrand: data.bikeBrand,
      licenseNumber: data.licenseNumber,
      experience: data.experience,
      region: data.region,
      district: data.district,
      status: "pending",
      appliedAt: new Date(),
    };
    console.log("rider info", riderData);
    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application submitted successfully!",
          confirmButtonText: "Ok",
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 my-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Become a Rider
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1">Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.age && (
            <span className="text-red-500 text-sm">Age is required</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">Phone is required</span>
          )}
        </div>

        {/* National ID */}
        <div>
          <label className="block mb-1">National ID</label>
          <input
            type="text"
            {...register("nationalId", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.nationalId && (
            <span className="text-red-500 text-sm">NID is required</span>
          )}
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="block mb-1">Bike Registration Number</label>
          <input
            type="text"
            {...register("bikeRegNumber", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.bikeRegNumber && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block mb-1">Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.bikeBrand && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* License Number */}
        <div>
          <label className="block mb-1">Driving License Number</label>
          <input
            type="text"
            {...register("licenseNumber", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.licenseNumber && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1">Experience (years)</label>
          <input
            type="number"
            {...register("experience", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.experience && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Region */}
        <div>
          <label className="block mb-1">Region</label>
          <select
            {...register("region", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region, i) => (
              <option key={i} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <span className="text-red-500 text-sm">Region is required</span>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block mb-1">District</label>
          <select
            {...register("district", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select District</option>
            {getCoveredAreas(selectedRegion).map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <span className="text-red-500 text-sm">District is required</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#0fbc40] text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
