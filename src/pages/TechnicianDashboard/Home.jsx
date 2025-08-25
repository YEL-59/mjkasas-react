import React from 'react';
import { Wrench, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const TechnicianHome = () => {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back John</h1>
                <p className="text-gray-600 mt-2">Welcome back to your technician dashboard</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">My Work Orders</p>
                            <p className="text-2xl font-bold text-gray-900">156</p>
                            <p className="text-sm text-green-600">+5.2%</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wrench className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                            <p className="text-sm text-yellow-600">Active</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed Today</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                            <p className="text-sm text-green-600">+2.1%</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Urgent Tasks</p>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                            <p className="text-sm text-red-600">High Priority</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-900">HVAC Repair - Main Office</p>
                                <p className="text-sm text-gray-600">Building A, Floor 3</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">9:00 AM</p>
                            <p className="text-xs text-red-600">Urgent</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-900">Lighting Maintenance</p>
                                <p className="text-sm text-gray-600">Building B, Floor 1</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">11:30 AM</p>
                            <p className="text-xs text-yellow-600">In Progress</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-900">Plumbing Check</p>
                                <p className="text-sm text-gray-600">Building C, Floor 2</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">2:00 PM</p>
                            <p className="text-xs text-green-600">Scheduled</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-sm">📋</span>
                            </div>
                            <span className="text-gray-700">Start Work Order</span>
                        </button>
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 text-sm">✅</span>
                            </div>
                            <span className="text-gray-700">Complete Task</span>
                        </button>
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 text-sm">📸</span>
                            </div>
                            <span className="text-gray-700">Upload Photos</span>
                        </button>
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600 text-sm">📞</span>
                            </div>
                            <span className="text-gray-700">Report Issue</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Completed HVAC maintenance</p>
                                <p className="text-xs text-gray-600">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Started lighting repair</p>
                                <p className="text-xs text-gray-600">4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Reported equipment issue</p>
                                <p className="text-xs text-gray-600">6 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Completed plumbing check</p>
                                <p className="text-xs text-gray-600">Yesterday</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianHome;
