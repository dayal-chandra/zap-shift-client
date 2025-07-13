import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#068e79]">
        My Parcels ({parcels.length})
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id || index}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-3 capitalize">{parcel.type}</td>
                <td className="px-4 py-3">
                  {new Date(parcel.creation_date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      parcel.payment_status === "paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-green-600 hover:underline">
                    Pay
                  </button>
                  <button className="text-red-600 hover:underline">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
