import React from 'react';
import { TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';
import Managericon1 from '@/assets/svg/managericon1';
import Managericon2 from '@/assets/svg/managericon2';
import Managericon3 from '@/assets/svg/managericon3';
import Managericon4 from '@/assets/svg/managericon4';
import { useManagerDashboardCounts } from '@/hooks/managerdashboard.hook';

const SummaryCards = () => {
    const { data: counts, isLoading } = useManagerDashboardCounts();
    const total = counts?.total_work_orders ?? 0;
    const pending = counts?.pending_work_orders ?? 0;
    const inProgress = counts?.in_progress_work_orders ?? 0;
    const completed = counts?.completed_work_orders ?? 0;

    const cardsData = [
        {
            title: 'Total work orders',
            value: String(total),
            change: '+12.5%',
            icon: <Managericon1 className="w-6 h-6 text-purple-600" />,
            bgColor: 'bg-[#643DFF]',
        },
        {
            title: 'Pending',
            value: String(pending),
            change: '+8.2%',
            icon: <Managericon2 className="w-6 h-6 text-yellow-600" />,
            bgColor: 'bg-[#F0CB23]',
        },
        {
            title: 'In progress',
            value: String(inProgress),
            change: '+3.7%',
            icon: <Managericon3 className="w-6 h-6 text-blue-600" />,
            bgColor: 'bg-[#2563EB]',
        },
        {
            title: 'Completed',
            value: String(completed),
            change: '+1.0%',
            icon: <Managericon4 className="w-6 h-6 text-green-600" />,
            bgColor: 'bg-[#16A34A]',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardsData.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-lg " style={{ boxShadow: '0 4px 30px 0 rgba(26, 28, 33, 0.05)' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-medium text-[#191919] flex gap-2 items-center space-x-2 ">

                                <div className={`w-8 h-8 ${card.bgColor} rounded-full flex items-center justify-center py-1 `}>
                                    {card.icon}
                                </div>

                                {card.title}</p>
                            <p className="text-2xl font-medium text-gray-900 py-2">{card.value}</p>
                            <p className="text-sm text-[#3BB515]">{card.change}</p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
