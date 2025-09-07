import React from 'react';
import { Eye, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import WorkOrderCard from './components/WorkOrderCard';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';

const WorkOrder = () => {
    // Sample work order data - in a real app, this would come from an API
    const workOrders = [
        {
            id: 1,
            title: "Fix Broken Window - Unit 205",
            description: "Window in unit 205 has a crack and needs immediate replacement",
            status: "Completed",
            priority: "High",
            type: "Construction",
            category: "Plumbing",
            company: "ABC Company",
            documents: 2,
            created: "1/15/2024",
            due: "1/20/2024",
            jobType: "Regular",
            isBillable: true,
            isHazardous: false,
            initiator: {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
            },
            assignee: {
                name: "Mike Davis",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
            },
            location: "Riverside Apartment Complex",
            icon: "T",
            iconColor: "bg-orange-500"
        },
        {
            id: 2,
            title: "Monthly Floor Cleaning - Lobby",
            description: "Deep cleaning of main lobby floors",
            status: "Assigned",
            priority: "Medium",
            type: "Janitorial",
            category: "Cleaning",
            company: "XYZ Corp",
            documents: 1,
            created: "1/10/2024",
            due: "1/15/2024",
            jobType: "Regular",
            isBillable: true,
            isHazardous: false,
            initiator: {
                name: "David Brown",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            },
            assignee: {
                name: "Lisa Wilson",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
            },
            location: "Downtown Office Complex",
            icon: "🌿",
            iconColor: "bg-green-500"
        },
        {
            id: 3,
            title: "Hazardous Material Cleanup - Basement",
            description: "Chemical spill cleanup in basement storage area",
            status: "Unassigned",
            priority: "High",
            type: "Construction",
            category: "Hazardous",
            company: "DEF Industries",
            documents: 3,
            created: "1/16/2024",
            due: "1/17/2024",
            jobType: "Davis Bacon",
            isBillable: true,
            isHazardous: true,
            initiator: {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
            },
            assignee: {
                name: "Mike Davis",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
            },
            location: "Industrial Park Building A",
            icon: "T",
            iconColor: "bg-orange-500"
        }
    ];
    const navigate = useNavigate();

    const handleCreateWorkOrder = () => {
        navigate('/create-work-order');
    };
    // Show list view
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
                    <p className="text-[#858D9D] mt-1">Manage and track all work orders across your facilities</p>
                </div>
                <div>
                    <Button
                        onClick={handleCreateWorkOrder}
                        className="bg-black hover:bg-[#5a5a5a] text-white px-4 py-5 rounded-lg flex items-center space-x-2"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create work order</span>
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Status Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <Select defaultValue="assigned">
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Type Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <Select defaultValue="construction">
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="construction">Construction</SelectItem>
                                <SelectItem value="janitorial">Janitorial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Buildings Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Buildings</label>
                        <Select defaultValue="all">
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select building" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Buildings</SelectItem>
                                <SelectItem value="riverside">Riverside Apartment Complex</SelectItem>
                                <SelectItem value="downtown">Downtown Office Complex</SelectItem>
                                <SelectItem value="industrial">Industrial Park Building A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="mm/dd/yyyy"
                                className="pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Additional Filters */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Billing
                        </Button>
                        <Button variant="outline" size="sm">
                            Non-billing
                        </Button>
                    </div>
                </div>
            </div>

            {/* Work Orders List */}
            <div className="space-y-4">
                {workOrders.map((workOrder) => (
                    <WorkOrderCard
                        key={workOrder.id}
                        workOrder={workOrder}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorkOrder;