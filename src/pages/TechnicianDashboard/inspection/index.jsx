import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTechnicianInspections } from '@/hooks/techinicianinspection.hook.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const Inspection = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        status: 'Assigned',
        buildings: 'All Buildings',
        date: ''
    });

    // Fetch technician inspections
    const { inspections, isLoading } = useTechnicianInspections({ page: 1, perPage: 5 });

    const handleViewDetails = (workOrderId) => {
        navigate(`/technician/inspection/${workOrderId}`);
    };

   
    // Mock data for inspected work orders
    // Status badge helper at component scope
    const getStatusBadgeClass = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'completed':
            case 'inspected':
                return 'inline-flex px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800';
            case 'in progress':
                return 'inline-flex px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800';
            case 'incomplete':
            case 'assigned':
            default:
                return 'inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800';
        }
    };




    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Inspection</h1>
                <p className="text-gray-600 mt-2">Review completed order and assess performance outcomes.</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
                        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Assigned">Assigned</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Inspected">Inspected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Buildings Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="buildings" className="text-sm font-medium text-gray-700">Buildings</Label>
                        <Select value={filters.buildings} onValueChange={(value) => handleFilterChange('buildings', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select building" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Buildings">All Buildings</SelectItem>
                                <SelectItem value="Building A">Building A</SelectItem>
                                <SelectItem value="Building B">Building B</SelectItem>
                                <SelectItem value="Building C">Building C</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
                        <div className="relative">
                            <Input
                                id="date"
                                type="text"
                                placeholder="mm/dd/yyyy"
                                value={filters.date}
                                onChange={(e) => handleFilterChange('date', e.target.value)}
                                className="w-full pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Inspected Work Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Inspected Work Orders</h2>

                    <div className="overflow-hidden">
                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Work order ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Completed date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-600">Loading inspections…</td>
                                    </tr>
                                ) : inspections.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-600">No inspections found</td>
                                    </tr>
                                ) : (
                                    inspections.map((inspection) => (
                                        <tr key={inspection.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-green-600 font-medium text-sm">{inspection.uid}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{inspection.customerName || '—'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{inspection.dateOfCompletion || '—'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={getStatusBadgeClass(inspection.status)}>{inspection.status || '—'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleViewDetails(inspection.id)}
                                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inspection;
