import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CompletedOrderDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock data for the completed work order
    const workOrderData = {
        id: 'WO-004',
        title: 'Fire Safety Equipment Check',
        status: 'Completed',
        priority: 'Normal',
        category: 'Construction',
        jobType: 'Regular Wage',
        dueDate: 'July 28, 2025',
        completedBy: 'John Mitchell',
        hazardousCleanup: 'No',
        completedDate: 'July 30, 2025',
        description: 'Complete inspection of all fire safety equipment including extinguishers, alarm systems, and emergency exits. Verify all equipment is functional and properly maintained.',
        completionNotes: 'All fire safety equipment inspected and found to be in excellent condition. Replaced two expired fire extinguishers in the east wing. Updated maintenance logs and tested all alarm systems successfully.',
        beforePhotos: [
            {
                id: 1,
                image: '/api/placeholder/300/200',
                description: 'Fire extinguishers and alarm components before inspection'
            },
            {
                id: 2,
                image: '/api/placeholder/300/200',
                description: 'Exit signs and fire alarm pull station before inspection'
            }
        ],
        afterPhotos: [
            {
                id: 1,
                image: '/api/placeholder/300/200',
                description: 'Fire extinguishers with updated inspection tags'
            },
            {
                id: 2,
                image: '/api/placeholder/300/200',
                description: 'Control panel with green indicator lights showing system status'
            }
        ]
    };

    return (
        <div className="max-w-full mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
                {/* Back Navigation */}
                <button
                    onClick={() => navigate('/technician/completed-orders')}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                {/* Work Order Title and Status */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <h1 className="text-2xl font-bold text-gray-900">{workOrderData.title}</h1>
                        </div>
                        <p className="text-gray-600">Work Order ID: {workOrderData.id} • {workOrderData.status}</p>
                    </div>
                    <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                        {workOrderData.priority}
                    </span>
                </div>
            </div>

            {/* Work Order Details Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Work Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className='flex flex-col items-start space-x-2'>
                            <span className="font-semibold text-gray-900">Category</span>
                            <span className="ml-2 text-gray-600">{workOrderData.category}</span>
                        </div>
                        <div className='flex flex-col items-start space-x-2'>
                            <span className="font-semibold text-gray-900">Due Date:</span>
                            <span className="ml-2 text-gray-600">{workOrderData.dueDate}</span>
                        </div>
                        <div className='flex flex-col items-start space-x-2'>
                            <span className="font-semibold text-gray-900">Hazardous Cleanup:</span>
                            <span className="ml-2 text-gray-600">{workOrderData.hazardousCleanup}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className='flex flex-col items-start space-x-2'>
                            <span className="font-semibold text-gray-900">Job Type:</span>
                            <span className="ml-2 text-gray-600">{workOrderData.jobType}</span>
                        </div>
                        <div className='flex flex-col items-start space-x-2'>
                            <span className="font-semibold text-gray-900">Completed By:</span>
                            <span className="ml-2 text-gray-600">{workOrderData.completedBy}</span>
                        </div>
                        <div className='flex flex-col items-start space-x-2'>
                            <span className="font-semibold text-gray-900">Completed Date:</span>
                            <span className="ml-2 text-gray-600">{workOrderData.completedDate}</span>
                        </div>
                    </div>
                </div>

                {/* Order Description Section */}
                <div className="bg-white rounded-lg mt-6">
                    <h2 className=" font-semibold text-gray-900 mb-4">Order Description</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{workOrderData.description}</p>
                    </div>
                </div>

                {/* Before Photos Section */}
                <div className="bg-white rounded-lg mt-6 ">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Before Photos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {workOrderData.beforePhotos.map((photo) => (
                            <div key={photo.id} className="rounded-lg overflow-hidden">
                                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl">📷</span>
                                        </div>
                                        <p className="text-sm">Before Photo</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* After Photos Section */}
                <div className="bg-white rounded-lg mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">After Photos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {workOrderData.afterPhotos.map((photo) => (
                            <div key={photo.id} className="rounded-lg overflow-hidden">
                                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl">📷</span>
                                        </div>
                                        <p className="text-sm">After Photo</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Completion Notes Section */}
                <div className="bg-white rounded-lg mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Completion Notes</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{workOrderData.completionNotes}</p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between bg-white rounded-lg mt-6">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-900 font-medium">Work Order Completed Successfully</span>
                    </div>
                    <div className="text-gray-600">
                        Completed on 2024-01-20
                    </div>
                </div>


            </div>







        </div>
    );
};

export default CompletedOrderDetailsPage;
