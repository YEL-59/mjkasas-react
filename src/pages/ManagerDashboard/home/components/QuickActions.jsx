import React from 'react';
import { Search, FileText, Users, Building2 } from 'lucide-react';

const QuickActions = () => {
    const actions = [
        {
            title: 'New Inspection',
            icon: <Search className="w-5 h-5 text-red-600" />,
            bgColor: 'bg-red-100',
            onClick: () => console.log('New Inspection clicked'),
        },
        {
            title: 'Create Work Order',
            icon: <FileText className="w-5 h-5 text-blue-600" />,
            bgColor: 'bg-blue-100',
            onClick: () => console.log('Create Work Order clicked'),
        },
        {
            title: 'Manage Employees',
            icon: <Users className="w-5 h-5 text-green-600" />,
            bgColor: 'bg-green-100',
            onClick: () => console.log('Manage Employees clicked'),
        },
        {
            title: 'Manage Buildings',
            icon: <Building2 className="w-5 h-5 text-purple-600" />,
            bgColor: 'bg-purple-100',
            onClick: () => console.log('Manage Buildings clicked'),
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3 transition-colors"
                    >
                        <div className={`w-8 h-8 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                            {action.icon}
                        </div>
                        <span className="text-gray-700 font-medium">{action.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
