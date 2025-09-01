import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WorkOrderActivity = () => {
    const [activeTab, setActiveTab] = useState('Revenue');
    const [timeframe, setTimeframe] = useState('Yearly');

    const yearlyData = [
        { month: 'Jan', revenue: 5000, orders: 120, products: 45 },
        { month: 'Feb', revenue: 8000, orders: 180, products: 52 },
        { month: 'Mar', revenue: 12000, orders: 220, products: 68 },
        { month: 'Apr', revenue: 15000, orders: 280, products: 75 },
        { month: 'May', revenue: 18000, orders: 320, products: 82 },
        { month: 'Jun', revenue: 20885, orders: 380, products: 90 },
        { month: 'Jul', revenue: 22000, orders: 420, products: 95 },
        { month: 'Aug', revenue: 25000, orders: 480, products: 105 },
        { month: 'Sep', revenue: 28000, orders: 520, products: 115 },
        { month: 'Oct', revenue: 30000, orders: 580, products: 125 },
        { month: 'Nov', revenue: 32000, orders: 620, products: 135 },
        { month: 'Dec', revenue: 35000, orders: 680, products: 145 },
    ];

    const monthlyData = [
        { week: 'Week 1', revenue: 12000, orders: 280, products: 85 },
        { week: 'Week 2', revenue: 15000, orders: 320, products: 95 },
        { week: 'Week 3', revenue: 18000, orders: 380, products: 110 },
        { week: 'Week 4', revenue: 22000, orders: 450, products: 125 },
    ];

    const weeklyData = [
        { day: 'Mon', revenue: 3500, orders: 85, products: 25 },
        { day: 'Tue', revenue: 4200, orders: 95, products: 30 },
        { day: 'Wed', revenue: 3800, orders: 88, products: 28 },
        { day: 'Thu', revenue: 4500, orders: 102, products: 32 },
        { day: 'Fri', revenue: 5200, orders: 115, products: 35 },
        { day: 'Sat', revenue: 2800, orders: 65, products: 20 },
        { day: 'Sun', revenue: 2200, orders: 52, products: 18 },
    ];

    const getData = () => {
        switch (timeframe) {
            case 'Yearly':
                return yearlyData;
            case 'Monthly':
                return monthlyData;
            case 'Weekly':
                return weeklyData;
            default:
                return yearlyData;
        }
    };

    const getDataKey = () => {
        switch (activeTab) {
            case 'Revenue':
                return 'revenue';
            case 'Orders':
                return 'orders';
            case 'Products':
                return 'products';
            default:
                return 'revenue';
        }
    };

    const getXAxisKey = () => {
        switch (timeframe) {
            case 'Yearly':
                return 'month';
            case 'Monthly':
                return 'week';
            case 'Weekly':
                return 'day';
            default:
                return 'month';
        }
    };

    const formatYAxis = (tickItem) => {
        if (activeTab === 'Revenue') {
            return `$${(tickItem / 1000).toFixed(0)}k`;
        }
        return tickItem;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const formattedValue = activeTab === 'Revenue' ? `$${value.toLocaleString()}` : value;

            const getTimeframeLabel = () => {
                switch (timeframe) {
                    case 'Yearly':
                        return `${label} 2025`;
                    case 'Monthly':
                        return `${label} - Current Month`;
                    case 'Weekly':
                        return `${label} - This Week`;
                    default:
                        return `${label} 2025`;
                }
            };

            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900">{getTimeframeLabel()}</p>
                    <p className="text-sm text-gray-600">
                        {activeTab}: {formattedValue}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-gray-900">Work order activity</h2>
                <div className="relative">
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="appearance-none bg-white border rounded-lg pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Yearly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>
                    <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-md">
                <TabsList className="grid w-full grid-cols-3 mb-6 ">
                    <TabsTrigger value="Revenue" >Revenue</TabsTrigger>
                    <TabsTrigger value="Orders">Orders</TabsTrigger>
                    <TabsTrigger value="Products">Products</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ff6b35" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey={getXAxisKey()}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickFormatter={formatYAxis}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey={getDataKey()}
                            stroke="#ff6b35"
                            strokeWidth={3}
                            fill="url(#colorRevenue)"
                            dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#ff6b35', strokeWidth: 2, fill: '#fff' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WorkOrderActivity;
