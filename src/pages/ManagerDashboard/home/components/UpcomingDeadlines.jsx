import React from 'react';

const UpcomingDeadlines = () => {
    const deadlines = [
        {
            title: 'HVAC System Maintenance',
            location: 'Main Office Building',
            date: '2024-02-15',
            assignee: 'Mike Davis',
        },
        {
            title: 'Office Deep Cleaning',
            location: 'Main Office Building',
            date: '2024-02-10',
            assignee: 'Lisa Brown',
        },
        {
            title: 'Security System Check',
            location: 'Warehouse A',
            date: '2024-02-12',
            assignee: 'John Smith',
        },
        {
            title: 'Fire Safety Inspection',
            location: 'Building C',
            date: '2024-02-18',
            assignee: 'Sarah Wilson',
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
                {deadlines.map((deadline, index) => (
                    <div
                        key={index}
                        className="bg-[#F9FAFB] p-4 rounded-lg shadow-lg  flex items-center justify-between"
                        style={{ boxShadow: '0 4px 30px 0 rgba(26, 28, 33, 0.05)' }}
                    >
                        {/* Left Section - Task Details */}
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                            <p className="text-xs text-gray-600">{deadline.location}</p>
                        </div>

                        {/* Right Section - Date and Assignee */}
                        <div className="flex flex-col items-end">
                            <p className="text-sm text-gray-900">{deadline.date}</p>
                            <p className="text-xs text-gray-600">{deadline.assignee}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingDeadlines;
