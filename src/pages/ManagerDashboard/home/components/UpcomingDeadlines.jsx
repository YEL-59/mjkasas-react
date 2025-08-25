import React from 'react';

const UpcomingDeadlines = () => {
    const deadlines = [
        {
            title: 'HVAC System Maintenance',
            location: 'Main Office Building',
            date: '2024-02-15',
            assignee: 'Mike Davis',
            priority: 'high',
            borderColor: 'border-red-500',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
        },
        {
            title: 'Office Deep Cleaning',
            location: 'Main Office Building',
            date: '2024-02-10',
            assignee: 'Lisa Brown',
            priority: 'medium',
            borderColor: 'border-yellow-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600',
        },
        {
            title: 'Office Deep Cleaning',
            location: 'Main Office Building',
            date: '2024-02-10',
            assignee: 'Lisa Brown',
            priority: 'medium',
            borderColor: 'border-yellow-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600',
        },
        {
            title: 'Office Deep Cleaning',
            location: 'Main Office Building',
            date: '2024-02-10',
            assignee: 'Lisa Brown',
            priority: 'medium',
            borderColor: 'border-yellow-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600',
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
                {deadlines.map((deadline, index) => (
                    <div
                        key={index}
                        className={`p-3 border-l-4 ${deadline.borderColor} ${deadline.bgColor} rounded-r-lg`}
                    >
                        <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                        <p className="text-xs text-gray-600">{deadline.location}</p>
                        <div className="flex items-center justify-between mt-1">
                            <p className={`text-xs ${deadline.textColor} font-medium`}>{deadline.date}</p>
                            <p className="text-xs text-gray-500">{deadline.assignee}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingDeadlines;
