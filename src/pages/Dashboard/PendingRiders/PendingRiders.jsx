import React, { useState } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isPending) return "....Loading";

  const handleStatusUpdate = async (id, newStatus) => {
    const actionText =
      newStatus === "approved"
        ? "Yes, approve!"
        : newStatus === "cancelled"
        ? "Yes, cancel!"
        : "Yes, proceed!";

    const confirmText =
      newStatus === "approved"
        ? "Do you want to approve this rider?"
        : "Do you want to cancel this rider?";

    // Show confirmation popup
    const result = await Swal.fire({
      title: confirmText,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: actionText,
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/status/${id}`, {
          status: newStatus,
        });

        if (res.data.modifiedCount > 0) {
          // ✅ SUCCESS POPUP
          Swal.fire({
            icon: "success",
            title: `Rider ${newStatus}`,
          });

          // ✅ REFRESH THE TABLE DATA HERE
          refetch();

          // ✅ CLOSE MODAL IF OPEN
          setModalIsOpen(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to update status.");
      }
    }
  };

  const openModal = (rider) => {
    setSelectedRider(rider);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRider(null);
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Region</th>
              <th className="px-4 py-2 text-left">District</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id} className="border-t">
                <td className="px-4 py-2">{rider.name}</td>
                <td className="px-4 py-2">{rider.email}</td>
                <td className="px-4 py-2">{rider.phone}</td>
                <td className="px-4 py-2">{rider.region}</td>
                <td className="px-4 py-2">{rider.district}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => openModal(rider)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(rider._id, "approved")}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(rider._id, "cancelled")}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for full rider info */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Rider Details"
        shouldCloseOnOverlayClick={true}
        className="max-w-lg mx-auto mt-20 p-6 bg-white rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
      >
        {selectedRider && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Rider Information</h3>
            <div className="space-y-1">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nationalId}
              </p>
              <p>
                <strong>Bike Reg:</strong> {selectedRider.bikeRegNumber}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
              </p>
              <p>
                <strong>License:</strong> {selectedRider.licenseNumber}
              </p>
              <p>
                <strong>Experience:</strong> {selectedRider.experience} years
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Close
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedRider._id, "approved")
                }
                className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedRider._id, "cancelled")
                }
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingRiders;
