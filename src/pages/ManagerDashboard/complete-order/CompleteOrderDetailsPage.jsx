import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, CheckCircle, Calendar, User, MapPin, AlertTriangle } from 'lucide-react';
import { useTechnicianWorkOrderDetail } from '@/hooks/workorder.hook';

const CompleteOrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { detail, isLoading, isError, refetch } = useTechnicianWorkOrderDetail({ id });

    const placeholderImg = 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png';
    const safeSrc = (src) => {
        if (!src) return placeholderImg;
        return String(src).replace(/`/g, '').trim();
    };
    const formatDateLong = (d) => {
        if (!d) return '—';
        try {
            return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return String(d);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-600 mb-4">Failed to load work order</p>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => refetch()}>Retry</Button>
                    <Button variant="ghost" onClick={() => navigate('/completed-orders')}>Back</Button>
                </div>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-600 mb-4">Work order not found</p>
                <button
                    onClick={() => navigate('/completed-orders')}
                    className="text-blue-600 hover:underline"
                >
                    Back to Completed Orders
                </button>
            </div>
        );
    }

    const beforePhotos = (detail?.galleries || []).filter(g => g.type === 'before').map(g => safeSrc(g.image_path));
    const afterPhotos = (detail?.galleries || []).filter(g => g.type === 'after').map(g => safeSrc(g.image_path));

    const orderDetails = {
        id: detail?.uid || `WO-${detail?.id}`,
        title: detail?.title || '—',
        category: detail?.category || detail?.fequency_job_type || '—',
        jobType: detail?.job_type || '—',
        dueDate: formatDateLong(detail?.due_date),
        completedBy: (detail?.technicians || []).map(t => t?.name).join(', ') || detail?.manager?.name || '—',
        hazardousCleanup: detail?.hazardous_cleanup ? 'Yes' : 'No',
        completedDate: formatDateLong(detail?.completed_on),
        description: detail?.description || '—',
        completionNotes: detail?.complete_note || '—',
        beforePhotos,
        afterPhotos,
        priority: detail?.priority || 'Normal',
        location: detail?.location || '—',
        status: detail?.status || '—',
        signature: safeSrc(detail?.signature),
    };

    const handleDownload = (type) => {
        // Mock download functionality
        console.log(`Downloading ${type} PDF for ${orderId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                {/* Left side - Navigation and Title */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/completed-orders')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>


                </div>

                {/* Right side - PDF Buttons and Status */}
                <div className="flex flex-col items-end space-y-3">
                    {/* PDF Download Buttons */}
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => handleDownload('internal')}
                            className="flex items-center space-x-2"
                        >
                            <Download className="h-4 w-4" />
                            <span>Internal Pdf</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleDownload('customer')}
                            className="flex items-center space-x-2"
                        >
                            <Download className="h-4 w-4" />
                            <span>Customer Pdf</span>
                        </Button>
                    </div>


                </div>
            </div>

            <div className="space-y-6">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* Work Details Card */}
                    <Card>
                        <CardHeader>
                            {/* <CardTitle className="text-lg font-semibold text-gray-900">Work Details</CardTitle> */}
                            <div className="flex items-center justify-between w-full border-b pb-3  ">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{orderDetails.title}</h1>
                                        <p className="text-gray-600">Work Order ID: {orderDetails.id} • {orderDetails.status}</p>
                                    </div>
                                </div>
                                <div>
                                    <Badge className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">{orderDetails.priority}</Badge>
                                </div>

                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Category</span>
                                    <p className="font-medium text-gray-900">{orderDetails.category}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Job Type</span>
                                    <p className="font-medium text-gray-900">{orderDetails.jobType}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Due Date</span>
                                    <p className="font-medium text-gray-900">{orderDetails.dueDate}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Completed By</span>
                                    <p className="font-medium text-gray-900">{orderDetails.completedBy}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Hazardous Cleanup</span>
                                    <p className="font-medium text-gray-900">{orderDetails.hazardousCleanup}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Completed Date</span>
                                    <p className="font-medium text-gray-900">{orderDetails.completedDate}</p>
                                </div>
                            </div>
                            {/* Order Description */}
                            <div className="mt-6 pt-4 ">
                                <span className="text-[#191919] font-medium text-sm">Order Description</span>
                                <p className="font-normal  text-[#111827] mt-2 bg-[#F9FAFB] p-2 rounded-lg ">{orderDetails.description}</p>
                            </div>
                        </CardContent>
                    </Card>




                    {/* Before Photos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Before Photos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                {orderDetails.beforePhotos.map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={photo}
                                            alt={`Before photo ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg border"
                                            onError={(e) => { e.currentTarget.src = 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png'; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* After Photos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">After Photos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {orderDetails.afterPhotos.map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={photo}
                                            alt={`After photo ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg border"
                                            onError={(e) => { e.currentTarget.src = 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png'; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Completion Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Completion Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{orderDetails.completionNotes}</p>
                        </CardContent>
                    </Card>

                    {/* Completion Status */}
                    <div className="flex items-center justify-between pt-6 border-t">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-600 font-medium">Work Order Completed Successfully</span>
                        </div>
                        <span className="text-gray-500 text-sm">Completed on {orderDetails.completedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteOrderDetailsPage;
