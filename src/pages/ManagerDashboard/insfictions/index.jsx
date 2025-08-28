import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Calendar, CalendarIcon, Search, Bell, HelpCircle, User, MoreVertical, Plus, Eye } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Inspection = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState('Assigned');
    const [building, setBuilding] = useState('All Buildings');

    // Mock inspection data
    const inspections = [
        {
            id: 'WO-301',
            title: 'AC Repair & Maintenance Check',
            completedDate: 'July 28, 2023',
            priority: 'Normal'
        },
        {
            id: 'WO-302',
            title: 'Emergency Lighting Test',
            completedDate: 'July 28, 2023',
            priority: 'Urgent'
        },
        {
            id: 'WO-307',
            title: 'Boiler Water Inspection',
            completedDate: 'July 28, 2023',
            priority: 'Normal'
        },
        {
            id: 'WO-308',
            title: 'Painting and Light Repair',
            completedDate: 'July 28, 2023',
            priority: 'Normal'
        }
    ];

    const getPriorityBadgeVariant = (priority) => {
        switch (priority) {
            case 'Urgent':
                return 'destructive';
            case 'Normal':
                return 'secondary';
            default:
                return 'secondary';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'Urgent':
                return 'bg-red-100 text-red-800';
            case 'Normal':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Title Section */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inspection</h1>
                    <p className="text-gray-600">Review completed work and spaces performance outcomes.</p>
                </div>

                <button className='bg-[#717171] hover:bg-[#5a5a5a] text-white px-4 py-2 rounded-lg flex items-center space-x-2' onClick={() => navigate('/inspection/create')}>
                    <Plus className="h-4 w-4" />
                    <span>Create inspection</span>
                </button>

            </div>


            {/* Filters Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Assigned">Assigned</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buildings</label>
                    <Select value={building} onValueChange={setBuilding}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Buildings">All Buildings</SelectItem>
                            <SelectItem value="Building A">Building A</SelectItem>
                            <SelectItem value="Building B">Building B</SelectItem>
                            <SelectItem value="Building C">Building C</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'MM/dd/yyyy') : <span className="text-muted-foreground">mm/dd/yyyy</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Table Section */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspected work orders</h2>
                <div className="bg-white rounded-lg shadow-sm border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-medium text-gray-900">Work order ID</TableHead>
                                <TableHead className="font-medium text-gray-900">Title</TableHead>
                                <TableHead className="font-medium text-gray-900">Completed date</TableHead>
                                <TableHead className="font-medium text-gray-900">Priority</TableHead>
                                <TableHead className="font-medium text-gray-900">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inspections.map((inspection) => (
                                <TableRow key={inspection.id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <span
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                                            onClick={() => navigate(`/inspection/${inspection.id}`)}
                                        >
                                            {inspection.id}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-900">{inspection.title}</TableCell>
                                    <TableCell className="text-gray-600">{inspection.completedDate}</TableCell>
                                    <TableCell>
                                        <Badge className={getPriorityBadgeClass(inspection.priority)}>
                                            {inspection.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                                            onClick={() => navigate(`/inspection/${inspection.id}`)}
                                        >
                                            View Details
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Inspection;