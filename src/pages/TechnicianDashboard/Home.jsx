import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Camera, Circle } from 'lucide-react';

const TechnicianHome = () => {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back Bryan</h1>
                <p className="text-gray-600 mt-2">Welcome back to your work order dashboard.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Assigned Work</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending Work</p>
                            <p className="text-2xl font-bold text-gray-900">5</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Overdue Work</p>
                            <p className="text-2xl font-bold text-gray-900">2</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">87%</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity and Upcoming Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Completed work order HVAC System Maintenance - Building A</p>
                                <p className="text-xs text-gray-600">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Camera className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Uploaded photos for Electrical Panel Inspection</p>
                                <p className="text-xs text-gray-600">4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Circle className="w-5 h-5 text-orange-600 fill-current" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Started work on Plumbing Repair - Floor 3</p>
                                <p className="text-xs text-gray-600">6 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Circle className="w-5 h-5 text-orange-600 fill-current" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Started work on Plumbing Repair - Floor 3</p>
                                <p className="text-xs text-gray-600">6 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-900">HVAC System Maintenance</p>
                                <p className="text-xs text-gray-600">Main Office Building</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-600">2024-02-15</p>
                                <p className="text-xs text-gray-500">Mike Davis</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Office Deep Cleaning</p>
                                <p className="text-xs text-gray-600">Main Office Building</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-600">2024-02-10</p>
                                <p className="text-xs text-gray-500">Lisa Brown</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Office Deep Cleaning</p>
                                <p className="text-xs text-gray-600">Main Office Building</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-600">2024-02-10</p>
                                <p className="text-xs text-gray-500">Lisa Brown</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Office Deep Cleaning</p>
                                <p className="text-xs text-gray-600">Main Office Building</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-600">2024-02-10</p>
                                <p className="text-xs text-gray-500">Lisa Brown</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newly Assign Tasks */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Newly Assign Tasks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Task 1 - WO-006 */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Work Order ID</p>
                                <p className="text-lg font-bold text-gray-900">WO-006</p>
                            </div>
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Urgent
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Task</p>
                                <p className="text-sm text-gray-900">Fire Safety Equipment Check</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Location</p>
                                <p className="text-sm text-gray-900">Building B - Floor 2</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Due</p>
                                <p className="text-sm text-gray-900">Today, 2:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Task 2 - WO-007 */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Work Order ID</p>
                                <p className="text-lg font-bold text-gray-900">WO-007</p>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Normal
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Task</p>
                                <p className="text-sm text-gray-900">Elevator Maintenance</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Location</p>
                                <p className="text-sm text-gray-900">Main Building</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Due</p>
                                <p className="text-sm text-gray-900">Tomorrow, 9:00 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Task 3 - WO-008 */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Work Order ID</p>
                                <p className="text-lg font-bold text-gray-900">WO-008</p>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Normal
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Task</p>
                                <p className="text-sm text-gray-900">Security System Check</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Location</p>
                                <p className="text-sm text-gray-900">Building A - Lobby</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Due</p>
                                <p className="text-sm text-gray-900">Jan 28, 1:30 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianHome;
