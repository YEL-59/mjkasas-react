import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, TrendingUp, Award } from 'lucide-react';

const OrderStats = ({ stats }) => {
    const defaultStats = {
        totalCompleted: 156,
        thisMonth: 23,
        onTimeCompletion: 94,
        averageRating: 4.8,
        ...stats
    };

    const statCards = [
        {
            title: 'Total Completed',
            value: defaultStats.totalCompleted,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            description: 'All time completed orders'
        },
        {
            title: 'This Month',
            value: defaultStats.thisMonth,
            icon: Clock,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            description: 'Orders completed this month'
        },
        {
            title: 'On-Time Rate',
            value: `${defaultStats.onTimeCompletion}%`,
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            description: 'Completed on schedule'
        },
        {
            title: 'Average Rating',
            value: defaultStats.averageRating,
            icon: Award,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            description: 'Customer satisfaction score'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stat.value}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default OrderStats;
