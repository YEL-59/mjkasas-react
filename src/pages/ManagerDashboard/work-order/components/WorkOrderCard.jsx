import React from 'react';
import { Eye, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WorkOrderCard = ({ workOrder }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/work-order/${workOrder.id}`);
    };
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'assigned':
                return 'bg-blue-100 text-blue-800';
            case 'unassigned':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'text-red-600';
            case 'medium':
                return 'text-yellow-600';
            case 'low':
                return 'text-green-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                {/* Left side - Main content */}
                <div className="flex-1">
                    <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`w-8 h-8 ${workOrder.iconColor} rounded flex items-center justify-center text-white text-sm font-semibold`}>
                            {workOrder.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{workOrder.title}</h3>
                                <div className="flex items-center space-x-2">
                                    {/* Tags */}
                                    {workOrder.isBillable && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                            BILLABLE
                                        </span>
                                    )}
                                    {workOrder.isHazardous && (
                                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                                            HAZARDOUS
                                        </span>
                                    )}
                                    {/* Status */}
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(workOrder.status)}`}>
                                        {workOrder.status}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-4">{workOrder.description}</p>

                            {/* Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                                <div>
                                    <span className="font-medium">Created:</span> {workOrder.created}
                                </div>
                                <div>
                                    <span className="font-medium">Job Type:</span> {workOrder.jobType}
                                </div>
                                <div>
                                    <span className="font-medium">Due:</span> {workOrder.due}
                                </div>
                                <div>
                                    <span className="font-medium">Priority:</span>
                                    <span className={`ml-1 ${getPriorityColor(workOrder.priority)}`}>
                                        {workOrder.priority}
                                    </span>
                                </div>
                            </div>

                            {/* People and Location */}
                            <div className="flex items-center space-x-6 mt-4 text-sm">
                                {/* Initiator */}
                                <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-500">Initiator:</span>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={workOrder.initiator.avatar}
                                            alt={workOrder.initiator.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span className="text-gray-900">{workOrder.initiator.name}</span>
                                    </div>
                                </div>

                                {/* Assignee */}
                                <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-500">Assignee:</span>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={workOrder.assignee.avatar}
                                            alt={workOrder.assignee.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span className="text-gray-900">{workOrder.assignee.name}</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center space-x-2">
                                    <Building className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-500">Location:</span>
                                    <span className="text-gray-900">{workOrder.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Action button */}
                <div className="ml-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleViewDetails}
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <Eye className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkOrderCard;
