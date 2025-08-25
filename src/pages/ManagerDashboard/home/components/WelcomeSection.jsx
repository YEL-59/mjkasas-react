import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const WelcomeSection = () => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back Bryan</h1>
                <p className="text-gray-600 mt-2">Welcome back to your work order dashboard</p>
            </div>

            <Button className="bg-[#717171] hover:bg-[#5a5a5a] text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create work order</span>
            </Button>
        </div>
    );
};

export default WelcomeSection;
