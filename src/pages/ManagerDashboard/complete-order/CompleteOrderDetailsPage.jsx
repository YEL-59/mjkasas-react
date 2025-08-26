import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, CheckCircle, Calendar, User, MapPin, AlertTriangle } from 'lucide-react';

const CompleteOrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    // Mock data for the specific order
    const orderDetails = {
        id: 'WO-004',
        title: 'Fire Safety Equipment Check',
        category: 'Construction',
        jobType: 'Regular Wage',
        dueDate: 'July 28, 2025',
        completedBy: 'John Mitchell',
        hazardousCleanup: 'No',
        completedDate: 'July 28, 2025',
        description: 'Complete inspection of all fire safety equipment including extinguishers, alarm systems, and emergency exits. Verify all equipment is functional and properly maintained.',
        completionNotes: 'All fire safety equipment inspected and found to be in excellent condition. Replaced two expired fire extinguishers in the east wing. Updated maintenance logs and tested all alarm systems successfully.',
        beforePhotos: [
            '/api/placeholder/300/200?text=Before+Photo+1',
            '/api/placeholder/300/200?text=Before+Photo+2',
            '/api/placeholder/300/200?text=Before+Photo+3'
        ],
        afterPhotos: [
            '/api/placeholder/300/200?text=After+Photo+1',
            '/api/placeholder/300/200?text=After+Photo+2',
            '/api/placeholder/300/200?text=After+Photo+3'
        ],
        priority: 'Normal',
        location: 'Main Building - All Floors'
    };

    const handleDownload = (type) => {
        // Mock download functionality
        console.log(`Downloading ${type} PDF for ${orderId}`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/completed-orders')}
                        className="flex items-center space-x-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                    <div className="h-6 w-px bg-gray-300" />
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{orderDetails.title}</h1>
                            <p className="text-gray-600">Work Order ID: {orderDetails.id} - Completed</p>
                        </div>
                    </div>
                </div>

                {/* Download Buttons */}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>Order Details</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Category</label>
                                    <p className="text-sm text-gray-900">{orderDetails.category}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Job Type</label>
                                    <p className="text-sm text-gray-900">{orderDetails.jobType}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Due Date</label>
                                    <p className="text-sm text-gray-900">{orderDetails.dueDate}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Completed By</label>
                                    <p className="text-sm text-gray-900">{orderDetails.completedBy}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hazardous Cleanup</label>
                                    <p className="text-sm text-gray-900">{orderDetails.hazardousCleanup}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Completed Date</label>
                                    <p className="text-sm text-gray-900">{orderDetails.completedDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{orderDetails.description}</p>
                        </CardContent>
                    </Card>

                    {/* Before Photos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Before Photos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {orderDetails.beforePhotos.map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={photo}
                                            alt={`Before photo ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg border"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* After Photos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>After Photos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {orderDetails.afterPhotos.map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={photo}
                                            alt={`After photo ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg border"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Completion Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Completion Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{orderDetails.completionNotes}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <h3 className="font-semibold text-green-800">Work Order Completed Successfully</h3>
                            </div>
                            <p className="text-sm text-green-700">Completed on 2024-01-20</p>
                        </CardContent>
                    </Card>

                    {/* Quick Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Location</p>
                                    <p className="text-sm text-gray-500">{orderDetails.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Assigned To</p>
                                    <p className="text-sm text-gray-500">{orderDetails.completedBy}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <AlertTriangle className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Priority</p>
                                    <Badge
                                        variant={orderDetails.priority === 'Urgent' ? 'destructive' : 'secondary'}
                                        className={orderDetails.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                                    >
                                        {orderDetails.priority}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CompleteOrderDetailsPage;
