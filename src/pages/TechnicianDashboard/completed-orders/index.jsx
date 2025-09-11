import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CompletedOrders = () => {
    const navigate = useNavigate();

    // Mock data for completed work orders
    const completedOrders = [
        {
            id: 'WO-004',
            title: 'Fire Safety Equipment Check',
            completedDate: 'July 28, 2025',
            priority: 'Normal',
            status: 'Completed'
        },
        {
            id: 'WO-006',
            title: 'Emergency Lighting Test',
            completedDate: 'July 28, 2025',
            priority: 'Urgent',
            status: 'Completed'
        },
        {
            id: 'WO-007',
            title: 'Boiler Room Inspection',
            completedDate: 'July 28, 2025',
            priority: 'Normal',
            status: 'Completed'
        },
        {
            id: 'WO-008',
            title: 'Parking Lot Light Repair',
            completedDate: 'July 28, 2025',
            priority: 'Normal',
            status: 'Completed'
        }
    ];

    const handleViewDetails = (workOrderId) => {
        navigate(`/technician/completed-orders/${workOrderId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Completed Orders</h1>
                    <p className="text-gray-600 mt-1">View your completed work orders and performance ratings.</p>
                </div>
            </div>

            {/* Recently Completed Work Orders Section */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recently Completed Work Orders</h2>

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
                                        Completed Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {completedOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-green-600 font-medium">
                                                {order.id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {order.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {order.completedDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.priority === 'Urgent' ? (
                                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                    {order.priority}
                                                </span>
                                            ) : (
                                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                                    {order.priority}
                                                </span>
                                            )}
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedOrders;
