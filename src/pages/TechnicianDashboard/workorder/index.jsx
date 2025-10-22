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
import { useTechnicianWorkOrders } from '@/hooks/tehnician.hook';

const Workorder = () => {
    const navigate = useNavigate();

    // Fetch API-driven work orders
    const [page, setPage] = useState(1);
    const { workOrders, pageInfo, isLoading, isError, error } = useTechnicianWorkOrders({ page, perPage: 15 });

    const formatDate = (iso) => {
        if (!iso) return '-';
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
    };

    const handleViewDetails = (workOrderId) => {
        // Navigate to work order details page with numeric id
        navigate(`/technician/work-order/${workOrderId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
                <p className="text-gray-600 mt-2">Track all work orders across your facilities</p>
            </div>

            {/* Error State */}
            {isError && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
                    {error?.message || 'Failed to load work orders.'}
                </div>
            )}

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
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-600 py-6">Loading work orders...</TableCell>
                            </TableRow>
                        ) : workOrders?.length ? (
                            workOrders.map((workOrder) => (
                                <TableRow key={workOrder.id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <span className="text-blue-600 font-medium">
                                            {workOrder.uid || workOrder.id}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">
                                        {workOrder.title}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {formatDate(workOrder.due_date)}
                                    </TableCell>
                                    <TableCell>
                                        {workOrder.priority === 'Urgent' ? (
                                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                                {workOrder.priority}
                                            </Badge>
                                        ) : (
                                            <span className="text-gray-600">{workOrder.priority || 'Normal'}</span>
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-600 py-6">No work orders found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Page {pageInfo?.currentPage ?? page} of {pageInfo?.lastPage ?? 1}
                </div>
                <div className="space-x-2">
                    <button
                        disabled={(pageInfo?.currentPage ?? page) <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={(pageInfo?.currentPage ?? page) >= (pageInfo?.lastPage ?? 1)}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Workorder;