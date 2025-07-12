import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import warehouse from "../Coverage/branchesData.json";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Extract unique region names
  const uniqueRegions = [...new Set(warehouse.map((item) => item.region))];

  // Get covered areas (service centers) by selected region
  const getCoveredAreas = (region) => {
    const branch = warehouse.find((b) => b.region === region);
    return branch ? branch.covered_area : [];
  };

  // Watch selected regions
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [parcelData, setParcelData] = useState(null);

  const onSubmit = (data) => {
    let cost = 100;
    if (data.type === "non-document") {
      cost += parseFloat(data.weight || 0) * 10;
    }
    if (data.senderServiceCenter !== data.receiverServiceCenter) {
      cost += 50;
    }

    setDeliveryCost(cost);
    setParcelData(data);
    setShowConfirm(true);
    toast.success(`Estimated delivery cost: $${cost}`);
  };

  const confirmSubmission = () => {
    const finalData = {
      ...parcelData,
      creation_date: new Date().toISOString(),
    };

    console.log("Saving to DB:", finalData);
    toast.success("Parcel added successfully!");
    setShowConfirm(false);
    reset();
  };

  const parcelType = watch("type");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-2 text-center">Add Parcel</h2>
      <p className="text-center mb-6">Provide pickup and delivery details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="border rounded-xl p-4 shadow">
          <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-orange-500"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-orange-500"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>

            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="input input-bordered"
            />
            {parcelType === "non-document" && (
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                placeholder="Weight (kg)"
                className="input input-bordered"
              />
            )}
          </div>
        </div>

        {/* Sender + Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="border rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold mb-4">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                defaultValue="John Doe"
                {...register("senderName", { required: true })}
                className="input input-bordered"
              />
              <input
                type="text"
                {...register("senderContact", { required: true })}
                placeholder="Sender Contact"
                className="input input-bordered"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region, index) => (
                  <option key={`sender-${region}-${index}`} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("senderServiceCenter", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Service Center</option>
                {getCoveredAreas(senderRegion).map((area, i) => (
                  <option key={`sender-center-${area}-${i}`} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <input
                type="text"
                {...register("senderAddress", { required: true })}
                placeholder="Pickup Address"
                className="input input-bordered"
              />
              <textarea
                {...register("pickupInstruction", { required: true })}
                placeholder="Pickup Instruction"
                className="textarea textarea-bordered"
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="border rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                {...register("receiverName", { required: true })}
                placeholder="Receiver Name"
                className="input input-bordered"
              />
              <input
                type="text"
                {...register("receiverContact", { required: true })}
                placeholder="Receiver Contact"
                className="input input-bordered"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region, index) => (
                  <option key={`receiver-${region}-${index}`} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("receiverServiceCenter", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Service Center</option>
                {getCoveredAreas(receiverRegion).map((area, i) => (
                  <option key={`receiver-center-${area}-${i}`} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                placeholder="Delivery Address"
                className="input input-bordered"
              />
              <textarea
                {...register("deliveryInstruction", { required: true })}
                placeholder="Delivery Instruction"
                className="textarea textarea-bordered"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-black">
            Submit
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 max-w-sm w-full">
            <h2 className="text-xl font-bold text-center">Confirm Parcel</h2>
            <p className="text-center">
              Delivery Cost:{" "}
              <span className="font-bold text-orange-500">${deliveryCost}</span>
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmSubmission}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendParcel;
