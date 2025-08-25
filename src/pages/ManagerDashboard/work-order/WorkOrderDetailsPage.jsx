import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkOrderDetails from './components/WorkOrderDetails';

const WorkOrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workOrder, setWorkOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sample work order data - in a real app, this would come from an API
    const workOrdersData = [
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

    useEffect(() => {
        // Simulate API call
        const fetchWorkOrder = async () => {
            setLoading(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const foundWorkOrder = workOrdersData.find(wo => wo.id === parseInt(id));
            setWorkOrder(foundWorkOrder);
            setLoading(false);
        };

        fetchWorkOrder();
    }, [id]);

    const handleBackToList = () => {
        navigate('/work-order');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading work order details...</p>
                </div>
            </div>
        );
    }

    if (!workOrder) {
        return (
            <div className="space-y-6">
                {/* Back Button */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={handleBackToList}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Work Orders</span>
                    </Button>
                </div>

                {/* Not Found */}
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Order Not Found</h2>
                    <p className="text-gray-600 mb-6">The work order you're looking for doesn't exist.</p>
                    <Button onClick={handleBackToList} className="bg-purple-600 hover:bg-purple-700">
                        Back to Work Orders
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={handleBackToList}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Work Orders</span>
                </Button>
            </div>

            {/* Details Content */}
            <WorkOrderDetails
                workOrder={workOrder}
                isPageView={true}
            />
        </div>
    );
};

export default WorkOrderDetailsPage;
