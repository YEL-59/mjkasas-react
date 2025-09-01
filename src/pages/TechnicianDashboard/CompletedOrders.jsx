import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const CompletedOrders = () => {
    // Mock completed orders data for technicians
    const completedOrders = [
        {
            id: 'WO-884',
            title: 'Fire Safety Equipment Check',
            completedDate: 'July 25, 2024',
            building: 'Greenpoint Plaza',
            status: 'Completed'
        },
        {
            id: 'WO-885',
            title: 'Emergency Lighting Test',
            completedDate: 'July 26, 2024',
            building: 'Building B',
            status: 'Completed'
        },
        {
            id: 'WO-887',
            title: 'Water Pump Inspection',
            completedDate: 'July 30, 2024',
            building: 'Main Complex',
            status: 'Completed'
        }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Completed Orders</h1>
                <p className="text-gray-600 mt-2">View all your completed work orders</p>
            </div>

            {/* Completed Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold text-gray-900">Work Order ID</TableHead>
                            <TableHead className="font-semibold text-gray-900">Title</TableHead>
                            <TableHead className="font-semibold text-gray-900">Completed Date</TableHead>
                            <TableHead className="font-semibold text-gray-900">Building</TableHead>
                            <TableHead className="font-semibold text-gray-900">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {completedOrders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <span className="text-blue-600 font-medium">
                                        {order.id}
                                    </span>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    {order.title}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {order.completedDate}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {order.building}
                                </TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        {order.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CompletedOrders;
