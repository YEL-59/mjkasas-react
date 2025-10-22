import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Camera, Circle } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useTechnicianDashboardSummary, useTechnicianUpcomingDeadlines, useTechnicianNewAssign } from '@/hooks/tehnician.hook';

const TechnicianHome = () => {
    const { userInfo } = useUser();
    const { summary, isLoading: summaryLoading } = useTechnicianDashboardSummary();
    const { deadlines, isLoading: deadlinesLoading, isError: deadlinesError } = useTechnicianUpcomingDeadlines();
    const { tasks, isLoading: newAssignLoading, isError: newAssignError } = useTechnicianNewAssign();

    const assigned = summary?.assigned_work_orders ?? 0;
    const pending = summary?.pending_work_orders ?? 0;
    const overdue = summary?.overdue_work_orders ?? 0;
    const completionRatePct = Math.round(((summary?.completion_rate ?? 0) * 100));

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back {userInfo?.name || userInfo?.fullName || 'Technician'}</h1>
                <p className="text-gray-600 mt-2">Welcome back to your work order dashboard.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Assigned Work</p>
                            <p className="text-2xl font-bold text-gray-900">{summaryLoading ? '—' : assigned}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{summaryLoading ? '—' : pending}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{summaryLoading ? '—' : overdue}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{summaryLoading ? '—' : `${completionRatePct}%`}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity and Upcoming Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity (static for now) */}
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
                    </div>
                </div>

                {/* Upcoming Deadlines (API) */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
                    {deadlinesLoading && (
                        <div className="text-gray-600">Loading deadlines...</div>
                    )}
                    {deadlinesError && (
                        <div className="text-red-600">Failed to load deadlines.</div>
                    )}
                    {!deadlinesLoading && deadlines?.length === 0 && (
                        <div className="text-gray-600">No upcoming deadlines.</div>
                    )}
                    <div className="space-y-4">
                        {deadlines?.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-600">{item.location || '—'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-600">{item.due_date}</p>
                                    <p className="text-xs text-gray-500">Priority: {item.priority}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newly Assign Tasks (API) */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Newly Assign Tasks</h2>
                {newAssignLoading && (
                    <div className="text-gray-600">Loading newly assigned tasks...</div>
                )}
                {newAssignError && (
                    <div className="text-red-600">Failed to load newly assigned tasks.</div>
                )}
                {!newAssignLoading && tasks?.length === 0 && (
                    <div className="text-gray-600">No newly assigned tasks.</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks?.map((task) => (
                        <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Work Order ID</p>
                                    <p className="text-lg font-bold text-gray-900">{task.uid}</p>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${task.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Task</p>
                                    <p className="text-sm text-gray-900">{task.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Location</p>
                                    <p className="text-sm text-gray-900">{task.location || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Due</p>
                                    <p className="text-sm text-gray-900">{task.due_date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechnicianHome;
