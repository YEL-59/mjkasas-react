import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompleteOrder = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for completed orders
    const completedOrders = [
        {
            id: 'WO-004',
            title: 'Fire Safety Equipment Check',
            completedDate: 'July 28, 2025',
            priority: 'Normal',
            category: 'Construction'
        },
        {
            id: 'WO-006',
            title: 'Emergency Lighting Test',
            completedDate: 'July 28, 2025',
            priority: 'Urgent',
            category: 'Maintenance'
        },
        {
            id: 'WO-007',
            title: 'Boiler Room Inspection',
            completedDate: 'July 28, 2025',
            priority: 'Normal',
            category: 'Inspection'
        },
        {
            id: 'WO-008',
            title: 'Parking Lot Light Repair',
            completedDate: 'July 28, 2025',
            priority: 'Normal',
            category: 'Repair'
        }
    ];

    const filteredOrders = completedOrders.filter(order =>
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (orderId) => {
        navigate(`/completed-orders/${orderId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Completed Orders</h1>
                    <p className="text-gray-600">View your completed work orders and performance ratings.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search work order..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Completed Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Recently Completed Work Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray/900 uppercase tracking-wider">
                                    Work Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray/900 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray/900 uppercase tracking-wider">
                                    Completed Date
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray/900 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray/900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-[#16A34A]">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                                        {order.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                        {order.completedDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge
                                            variant={order.priority === 'Urgent' ? 'destructive' : 'secondary'}
                                            className={order.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                                        >
                                            {order.priority}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewDetails(order.id)}
                                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                        >
                                            View Details
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No completed orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Completed orders will appear here.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CompleteOrder;