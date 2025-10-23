import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Download } from 'lucide-react';
import { useManagerInspectionDetails } from '@/hooks/managerinspectiondetails.hook.js';

const InspectionDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showVerifiedForm, setShowVerifiedForm] = useState(false);

    // Fetch inspection details from API
    const { details, isLoading } = useManagerInspectionDetails({ id });

    // Map API details to UI fields with safe fallbacks
    const inspectionDetails = {
        id: details?.uid || '',
        title: 'Inspection Details',
        status: details?.status || '—',
        employee: details?.technician?.name || details?.inspector?.name || '—',
        category: details?.building?.name || '—',
        jobType: '—',
        dueDate: details?.dateOfInspection || '—',
        completedBy: details?.technician?.name || '—',
        hazardousCleanup: '—',
        completedDate: details?.dateOfCompletion || '—',
        description: details?.completeNote || '—',
        completionNotes: details?.completeNote || '—',
        beforePhotos: Array.isArray(details?.beforePhotos) ? details.beforePhotos : [],
        afterPhotos: Array.isArray(details?.afterPhotos) ? details.afterPhotos : [],
    };

    const handleVerify = () => {
        setShowVerifiedForm(true);
    };

    const handleDownloadPDF = () => {
        console.log('Downloading PDF...');
        // Handle PDF download logic here
    };

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/inspection')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Inspection</h1>
                        <div className="text-sm text-gray-600">Loading inspection details…</div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="h-24 animate-pulse bg-gray-100 rounded" />
                </div>
            </div>
        );
    }

    if (showVerifiedForm) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto p-6">
                    {/* Verified Form Header */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-500">Verified form</h2>
                    </div>

                    {/* Verified Form Content */}
                    <div className="bg-white rounded-lg shadow-sm border p-8 space-y-8">
                        {/* Work Order Summary */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-xl font-bold text-gray-900">{inspectionDetails.title}</h1>
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <Badge className="bg-green-100 text-green-800">{inspectionDetails.status}</Badge>
                        </div>

                        {/* Work Order ID and Status */}
                        <div className="text-sm text-gray-600">
                            Work Order ID: {inspectionDetails.id} • Completed.
                        </div>

                        {/* Key Details - Two Column Layout */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Category</label>
                                    <p className="text-sm text-gray-900">{inspectionDetails.category}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Due Date</label>
                                    <p className="text-sm text-gray-900">{inspectionDetails.dueDate}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hazardous Cleanup</label>
                                    <p className="text-sm text-gray-900">{inspectionDetails.hazardousCleanup}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Job Type</label>
                                    <p className="text-sm text-gray-900">{inspectionDetails.jobType}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Completed By</label>
                                    <p className="text-sm text-gray-900">{inspectionDetails.completedBy}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Completed Date</label>
                                    <p className="text-sm text-gray-900">{inspectionDetails.completedDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Description */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Order Description</h3>
                            <p className="text-sm text-gray-600">{inspectionDetails.description}</p>
                        </div>

                        {/* Before Photos */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Before Photos</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {inspectionDetails.beforePhotos.map((photo, index) => (
                                    <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={photo}
                                            alt={`Before photo ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* After Photos */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">After Photos</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {inspectionDetails.afterPhotos.map((photo, index) => (
                                    <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={photo}
                                            alt={`After photo ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Completion Notes */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Completion Notes</h3>
                            <p className="text-sm text-gray-600 mb-4">{inspectionDetails.completionNotes}</p>
                        </div>

                        {/* Footer with Completion Status and Download Button */}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-600">Work Order Completed Successfully</span>
                            </div>
                            <div className="text-sm text-gray-500">Completed on 2024-01-20</div>
                        </div>

                        {/* Download PDF Button */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleDownloadPDF}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                            >
                                Download pdf
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/inspection')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inspection</h1>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{inspectionDetails.employee}</span>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">Employee</Badge>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                {/* Work Order Summary */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-900">{inspectionDetails.title}</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Badge className="bg-green-100 text-green-800">{inspectionDetails.status}</Badge>
                        </div>
                    </div>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <p className="text-sm text-gray-900">{inspectionDetails.category}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Job Type</label>
                        <p className="text-sm text-gray-900">{inspectionDetails.jobType}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Due Date</label>
                        <p className="text-sm text-gray-900">{inspectionDetails.dueDate}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Completed By</label>
                        <p className="text-sm text-gray-900">{inspectionDetails.completedBy}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Hazardous Cleanup</label>
                        <p className="text-sm text-gray-900">{inspectionDetails.hazardousCleanup}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Completed Date</label>
                        <p className="text-sm text-gray-900">{inspectionDetails.completedDate}</p>
                    </div>
                </div>

                {/* Order Description */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Order Description</h3>
                    <p className="text-sm text-gray-600">{inspectionDetails.description}</p>
                </div>

                {/* Before Photos */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Before Photos</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {inspectionDetails.beforePhotos.map((photo, index) => (
                            <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={photo}
                                    alt={`Before photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* After Photos */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">After Photos</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {inspectionDetails.afterPhotos.map((photo, index) => (
                            <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={photo}
                                    alt={`After photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Completion Notes */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Completion Notes</h3>
                    <p className="text-sm text-gray-600 mb-4">{inspectionDetails.completionNotes}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Work Order Completed Successfully</span>
                        </div>
                        <span className="text-sm text-gray-500">Completed on 2024-07-30</span>
                    </div>
                </div>

                {/* Verify Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleVerify}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                    >
                        Verify
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InspectionDetailsPage;
