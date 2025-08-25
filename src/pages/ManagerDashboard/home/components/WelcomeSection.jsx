import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeSection = () => {
    const navigate = useNavigate();

    const handleCreateWorkOrder = () => {
        navigate('/manager/create-work-order');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, Esther!</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your work orders today.</p>
                </div>
                <Button
                    onClick={handleCreateWorkOrder}
                    className="bg-[#717171] hover:bg-[#5a5a5a] text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create work order</span>
                </Button>
            </div>
        </div>
    );
};

export default WelcomeSection;