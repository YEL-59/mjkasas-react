import React from 'react';
import { TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';

const SummaryCards = () => {
    const cardsData = [
        {
            title: 'Total work orders',
            value: '24,895',
            change: '+12.5%',
            icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Pending',
            value: '384',
            change: '+8.2%',
            icon: <Clock className="w-6 h-6 text-yellow-600" />,
            bgColor: 'bg-yellow-100',
        },
        {
            title: 'In progress',
            value: '128',
            change: '+3.7%',
            icon: <Users className="w-6 h-6 text-blue-600" />,
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Completion Rates',
            value: '70%',
            change: '+1.0%',
            icon: <CheckCircle className="w-6 h-6 text-green-600" />,
            bgColor: 'bg-green-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardsData.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            <p className="text-sm text-green-600">{card.change}</p>
                        </div>
                        <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
