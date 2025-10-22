import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useTechnicianCompletedOrders } from "@/hooks/tehnician.hook";

const CompletedOrders = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const perPage = 5;

  const { completedOrders, pageInfo, isLoading, error } =
    useTechnicianCompletedOrders({ page, perPage, enabled: true });
  console.log(completedOrders);
  const handleViewDetails = (workOrderId) => {
    navigate(`/technician/completed-orders/${workOrderId}`);
  };

  const prevDisabled = pageInfo?.currentPage <= 1;
  const nextDisabled = pageInfo?.currentPage >= (pageInfo?.lastPage || 1);

  if (isLoading) {
    return <div className="p-6">Loading completed orders...</div>;
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">Failed to load completed orders</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Completed Orders</h1>
          <p className="text-gray-600 mt-1">
            View your completed work orders and performance ratings.
          </p>
        </div>
      </div>

      {/* Recently Completed Work Orders Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recently Completed Work Orders
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  !prevDisabled && setPage((p) => Math.max(1, p - 1))
                }
                disabled={prevDisabled}
                className={`px-3 py-1 border rounded ${
                  prevDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {pageInfo?.currentPage} of {pageInfo?.lastPage}
              </span>
              <button
                onClick={() => !nextDisabled && setPage((p) => p + 1)}
                disabled={nextDisabled}
                className={`px-3 py-1 border rounded ${
                  nextDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Work Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedOrders?.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-green-600 font-medium">
                        {order.uid || order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {order.complete_note}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {order.due_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(order.id)}
                        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {completedOrders?.length === 0 && (
                  <tr>
                    <td
                      className="px-6 py-4 text-center text-gray-600"
                      colSpan={6}
                    >
                      No completed orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrders;
