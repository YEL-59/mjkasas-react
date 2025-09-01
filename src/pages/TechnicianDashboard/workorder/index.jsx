import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const Workorder = () => {
    const navigate = useNavigate();

    // Mock work order data matching the image
    const workOrders = [
        {
            id: 'WO-884',
            title: 'Fire Safety Equipment Check',
            dueDate: 'July 25, 2024',
            priority: 'Normal',
            status: 'Assigned'
        },
        {
            id: 'WO-885',
            title: 'Emergency Lighting Test',
            dueDate: 'July 26, 2024',
            priority: 'Urgent',
            status: 'Assigned'
        },
        {
            id: 'WO-887',
            title: 'Water Pump Inspection',
            dueDate: 'July 30, 2024',
            priority: 'Normal',
            status: 'Assigned'
        },
        {
            id: 'WO-889',
            title: 'Parking Lot Light Repair',
            dueDate: 'July 29, 2024',
            priority: 'Normal',
            status: 'Assigned'
        },
        {
            id: 'WO-890',
            title: 'Window repair in unit 205',
            dueDate: 'July 30, 2024',
            priority: 'Normal',
            status: 'Assigned'
        }
    ];

    const handleViewDetails = (workOrderId) => {
        console.log('Viewing details for:', workOrderId);
        // Navigate to work order details page
        // navigate(`/technician/work-order/${workOrderId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
                <p className="text-gray-600 mt-2">Track all work orders across your facilities</p>
            </div>

            {/* Work Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold text-gray-900">Work Order ID</TableHead>
                            <TableHead className="font-semibold text-gray-900">Title</TableHead>
                            <TableHead className="font-semibold text-gray-900">Due Date</TableHead>
                            <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                            <TableHead className="font-semibold text-gray-900">Status</TableHead>
                            <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workOrders.map((workOrder) => (
                            <TableRow key={workOrder.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <span className="text-blue-600 font-medium">
                                        {workOrder.id}
                                    </span>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    {workOrder.title}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {workOrder.dueDate}
                                </TableCell>
                                <TableCell>
                                    {workOrder.priority === 'Urgent' ? (
                                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                            {workOrder.priority}
                                        </Badge>
                                    ) : (
                                        <span className="text-gray-600">{workOrder.priority}</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        {workOrder.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleViewDetails(workOrder.id)}
                                        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                                    >
                                        View Details
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Workorder;