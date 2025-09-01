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

const Inspection = () => {
    // Mock inspection data for technicians
    const inspections = [
        {
            id: 'INS-001',
            title: 'Fire Safety Equipment Inspection',
            building: 'Greenpoint Plaza',
            assignedDate: 'July 25, 2024',
            dueDate: 'July 30, 2024',
            status: 'Assigned'
        },
        {
            id: 'INS-002',
            title: 'Emergency Lighting System Check',
            building: 'Building B',
            assignedDate: 'July 26, 2024',
            dueDate: 'July 31, 2024',
            status: 'In Progress'
        },
        {
            id: 'INS-003',
            title: 'Water Pump System Inspection',
            building: 'Main Complex',
            assignedDate: 'July 27, 2024',
            dueDate: 'August 1, 2024',
            status: 'Assigned'
        }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Inspections</h1>
                <p className="text-gray-600 mt-2">Manage your assigned inspection tasks</p>
            </div>

            {/* Inspections Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold text-gray-900">Inspection ID</TableHead>
                            <TableHead className="font-semibold text-gray-900">Title</TableHead>
                            <TableHead className="font-semibold text-gray-900">Building</TableHead>
                            <TableHead className="font-semibold text-gray-900">Assigned Date</TableHead>
                            <TableHead className="font-semibold text-gray-900">Due Date</TableHead>
                            <TableHead className="font-semibold text-gray-900">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inspections.map((inspection) => (
                            <TableRow key={inspection.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <span className="text-blue-600 font-medium">
                                        {inspection.id}
                                    </span>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    {inspection.title}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {inspection.building}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {inspection.assignedDate}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {inspection.dueDate}
                                </TableCell>
                                <TableCell>
                                    {inspection.status === 'In Progress' ? (
                                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                            {inspection.status}
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                            {inspection.status}
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Inspection;
