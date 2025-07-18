import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const formateDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return "....Loading";
  }

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Parcel ID</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Transaction ID</th>
            <th className="py-2 px-4 text-left">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments?.length > 0 ? (
            payments.map((payment, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{payment.parcelId}</td>
                <td className="py-2 px-4">${payment.amount}</td>
                <td className="py-2 px-4">{payment.transactionId}</td>
                <td className="py-2 px-4">
                  {new Date(payment.paid_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No payment history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
