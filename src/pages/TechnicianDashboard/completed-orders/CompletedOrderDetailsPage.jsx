import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useTechnicianWorkOrderDetails } from "@/hooks/tehnician.hook";

const CompletedOrderDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { workOrder, isLoading, error } = useTechnicianWorkOrderDetails(id);

  if (isLoading) {
    return <div className="p-6">Loading work order...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Failed to load work order</div>;
  }
  if (!workOrder) {
    return <div className="p-6">No work order found.</div>;
  }

  const technicians = Array.isArray(workOrder.technicians)
    ? workOrder.technicians
    : [];
  const completedBy = technicians?.[0]?.name || "";
  const hazardousCleanup = workOrder.hazardous_cleanup ? "Yes" : "No";
  const beforePhotos = (workOrder.galleries || []).filter(
    (g) => g.type === "before"
  );
  const afterPhotos = (workOrder.galleries || []).filter(
    (g) => g.type === "after"
  );

  return (
    <div className="max-w-full mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        {/* Back Navigation */}
        <button
          onClick={() => navigate("/technician/completed-orders")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Work Order Title and Status */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                {workOrder.title}
              </h1>
            </div>
            <p className="text-gray-600">
              Work Order ID: {workOrder.uid || workOrder.id} •{" "}
              {workOrder.status}
            </p>
          </div>
          <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {workOrder.priority}
          </span>
        </div>
      </div>

      {/* Work Order Details Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Work Order Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col items-start space-x-2">
              <span className="font-semibold text-gray-900">Category</span>
              <span className="ml-2 text-gray-600">{workOrder.category}</span>
            </div>
            <div className="flex flex-col items-start space-x-2">
              <span className="font-semibold text-gray-900">Due Date:</span>
              <span className="ml-2 text-gray-600">{workOrder.due_date}</span>
            </div>
            <div className="flex flex-col items-start space-x-2">
              <span className="font-semibold text-gray-900">
                Hazardous Cleanup:
              </span>
              <span className="ml-2 text-gray-600">{hazardousCleanup}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col items-start space-x-2">
              <span className="font-semibold text-gray-900">Job Type:</span>
              <span className="ml-2 text-gray-600">{workOrder.job_type}</span>
            </div>
            <div className="flex flex-col items-start space-x-2">
              <span className="font-semibold text-gray-900">Completed By:</span>
              <span className="ml-2 text-gray-600">{completedBy}</span>
            </div>
            <div className="flex flex-col items-start space-x-2">
              <span className="font-semibold text-gray-900">
                Follow Up Date:
              </span>
              <span className="ml-2 text-gray-600">
                {workOrder.follow_up_date}
              </span>
            </div>
          </div>
        </div>

        {/* Order Description Section */}
        <div className="bg-white rounded-lg mt-6">
          <h2 className=" font-semibold text-gray-900 mb-4">
            Order Description
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {workOrder.description}
            </p>
          </div>
        </div>

        {/* Completion Notes Section */}
        <div className="bg-white rounded-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Completion Notes
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {workOrder.complete_note}
            </p>
          </div>
        </div>

        {/* Signature Section */}
        {workOrder.signature && (
          <div className="bg-white rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Signature
            </h2>
            <div className="border rounded-lg p-4">
              <img
                src={String(workOrder.signature).replace(/`/g, "").trim()}
                alt="Signature"
                className="mx-auto max-h-48 object-contain"
              />
            </div>
          </div>
        )}

        {/* Before Photos Section */}
        <div className="bg-white rounded-lg mt-6 ">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Before Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beforePhotos.map((photo) => (
              <div key={photo.id} className="rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  {photo.image_path ? (
                    <img
                      src={String(photo.image_path).replace(/`/g, "").trim()}
                      alt={photo.description || "Before photo"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">📷</span>
                      </div>
                      <p className="text-sm">Before Photo</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {beforePhotos.length === 0 && (
              <div className="text-gray-600">No before photos.</div>
            )}
          </div>
        </div>

        {/* After Photos Section */}
        <div className="bg-white rounded-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            After Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {afterPhotos.map((photo) => (
              <div key={photo.id} className="rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  {photo.image_path ? (
                    <img
                      src={String(photo.image_path).replace(/`/g, "").trim()}
                      alt={photo.description || "After photo"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">📷</span>
                      </div>
                      <p className="text-sm">After Photo</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {afterPhotos.length === 0 && (
              <div className="text-gray-600">No after photos.</div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between bg-white rounded-lg mt-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-900 font-medium">
              Work Order Completed
            </span>
          </div>
          <div className="text-gray-600">
            Completed on {workOrder.completed_on || "—"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrderDetailsPage;
