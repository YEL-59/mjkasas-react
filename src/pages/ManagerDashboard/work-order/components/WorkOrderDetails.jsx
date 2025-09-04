import React, { useState } from 'react';
import { X, Camera, Calendar, FileText, User, Building, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit3Icon } from 'lucide-react';
import { Delete } from 'lucide-react';
import { DeleteIcon } from 'lucide-react';

const WorkOrderDetails = ({ workOrder, isOpen, onClose, isPageView = true }) => {
    const [completionDate, setCompletionDate] = useState('');
    const [notes, setNotes] = useState('');

    // If it's a page view, don't check for isOpen
    if (!isPageView && (!isOpen || !workOrder)) return null;

    // For page view, render without modal wrapper
    if (isPageView) {
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white border-none rounded-lg p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Work Order #{workOrder.id}</h2>
                        <p className="text-gray-600">{workOrder.title}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Work Details Card */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Details</h3>
                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Category</span>
                                    <p className="font-medium text-gray-900">{workOrder.category}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Job Type</span>
                                    <p className="font-medium text-gray-900">{workOrder.category}</p>
                                </div>
                                <div className="flex gap-5 items-center space-y-1">
                                    <span className="text-[#374151] text-sm">Priority</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                                            {workOrder.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center space-y-1">
                                    <span className="text-[#374151] text-sm">Status</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                                            {workOrder.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Assigned To</span>
                                    <p className="font-medium text-[#111827]">{workOrder.company}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Due Date</span>
                                    <p className="font-medium text-[#111827]">{workOrder.documents} documents</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Follow-up Date</span>
                                    <p className="font-medium text-[#111827]">{workOrder.created}</p>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="text-[#374151] text-sm">Hazardous Cleanup</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-gray-900">{workOrder.id}</span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                            {workOrder.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t">
                                <span className="text-[#374151] text-sm">Description</span>
                                <p className="font-medium text-[#111827] mt-2">{workOrder.description}</p>
                            </div>
                        </div>

                        {/* Before Photos */}
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Before Photos</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4 text-center">
                                    <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                                        <span className="text-gray-500">Window with broken glass</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Window with broken glass</p>
                                </div>
                                <div className="border rounded-lg p-4 text-center">
                                    <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                                        <span className="text-gray-500">Window with broken glass</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Window with broken glass</p>
                                </div>
                            </div>
                        </div>

                        {/* Original Signature */}
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Signature</h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                                <span className="text-gray-500">Signature area</span>
                            </div>
                        </div>

                        {/* Complete Work Order */}
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Work Order</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Completion Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={completionDate}
                                        onChange={(e) => setCompletionDate(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Notes
                                    </label>
                                    <Textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add completion notes..."
                                        rows={4}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        After Photos
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-500">Take a photo or upload one</p>
                                    </div>
                                </div>
                                <Button className="w-full bg-black py-5 hover:bg-gray-700 text-white">
                                    Mark as Completed
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Employee Reports */}
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Reports</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={workOrder.assignee.avatar}
                                            alt={workOrder.assignee.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="font-medium">{workOrder.assignee.name}</span>
                                    </div>
                                    <span className="text-gray-600">16h</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total hours</span>
                                        <span>16h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Billing Information */}
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={workOrder.initiator.avatar}
                                            alt={workOrder.initiator.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="font-medium">{workOrder.initiator.name}</span>
                                    </div>
                                    <span className="text-gray-600">$200</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span className='text-[#16A34A]'>$245.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <div className="flex items-start flex-col space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Edit3Icon />
                                        <span className="font-normal">Edit Work Order</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <DeleteIcon />
                                        <span className="font-normal text-red-600">Delete Order</span>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // // Modal view (original implementation)
    // return (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
    //         <div className="bg-white w-full max-w-4xl h-full overflow-y-auto">
    //             {/* Header */}
    //             <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
    //                 <div>
    //                     <h2 className="text-2xl font-bold text-gray-900">Work Order #{workOrder.id}</h2>
    //                     <p className="text-gray-600">{workOrder.title}</p>
    //                 </div>
    //                 <Button
    //                     variant="ghost"
    //                     size="sm"
    //                     onClick={onClose}
    //                     className="text-gray-500 hover:text-gray-700"
    //                 >
    //                     <X className="h-5 w-5" />
    //                 </Button>
    //             </div>

    //             <div className="p-6">
    //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //                     {/* Main Content */}
    //                     <div className="lg:col-span-2 space-y-6">
    //                         {/* Work Details Card */}
    //                         <div className="bg-gray-50 rounded-lg p-6">
    //                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Details</h3>
    //                             <div className="grid grid-cols-2 gap-4 text-sm">
    //                                 <div>
    //                                     <span className="text-gray-500">Category:</span>
    //                                     <p className="font-medium">{workOrder.category}</p>
    //                                 </div>
    //                                 <div>
    //                                     <span className="text-gray-500">Priority:</span>
    //                                     <p className="font-medium text-red-600">{workOrder.priority}</p>
    //                                 </div>
    //                                 <div>
    //                                     <span className="text-gray-500">Company:</span>
    //                                     <p className="font-medium">{workOrder.company}</p>
    //                                 </div>
    //                                 <div>
    //                                     <span className="text-gray-500">Documents:</span>
    //                                     <p className="font-medium">{workOrder.documents} documents</p>
    //                                 </div>
    //                                 <div>
    //                                     <span className="text-gray-500">Created At:</span>
    //                                     <p className="font-medium">{workOrder.created}</p>
    //                                 </div>
    //                                 <div>
    //                                     <span className="text-gray-500">Work Order ID:</span>
    //                                     <div className="flex items-center space-x-2">
    //                                         <span className="font-medium">{workOrder.id}</span>
    //                                         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
    //                                             {workOrder.status}
    //                                         </span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="mt-4">
    //                                 <span className="text-gray-500">Description:</span>
    //                                 <p className="font-medium mt-1">{workOrder.description}</p>
    //                             </div>
    //                         </div>

    //                         {/* Before Photos */}
    //                         <div className="bg-white border rounded-lg p-6">
    //                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Before Photos</h3>
    //                             <div className="grid grid-cols-2 gap-4">
    //                                 <div className="border rounded-lg p-4 text-center">
    //                                     <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
    //                                         <span className="text-gray-500">Window with broken glass</span>
    //                                     </div>
    //                                     <p className="text-sm text-gray-600">Window with broken glass</p>
    //                                 </div>
    //                                 <div className="border rounded-lg p-4 text-center">
    //                                     <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
    //                                         <span className="text-gray-500">Window with broken glass</span>
    //                                     </div>
    //                                     <p className="text-sm text-gray-600">Window with broken glass</p>
    //                                 </div>
    //                             </div>
    //                         </div>

    //                         {/* Original Signature */}
    //                         <div className="bg-white border rounded-lg p-6">
    //                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Signature</h3>
    //                             <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
    //                                 <span className="text-gray-500">Signature area</span>
    //                             </div>
    //                         </div>

    //                         {/* Complete Work Order */}
    //                         <div className="bg-white border rounded-lg p-6">
    //                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Work Order</h3>
    //                             <div className="space-y-4">
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">
    //                                         Completion Date
    //                                     </label>
    //                                     <Input
    //                                         type="date"
    //                                         value={completionDate}
    //                                         onChange={(e) => setCompletionDate(e.target.value)}
    //                                         className="w-full"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">
    //                                         Notes
    //                                     </label>
    //                                     <Textarea
    //                                         value={notes}
    //                                         onChange={(e) => setNotes(e.target.value)}
    //                                         placeholder="Add completion notes..."
    //                                         rows={4}
    //                                         className="w-full"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block text-sm font-medium text-gray-700 mb-2">
    //                                         After Photos
    //                                     </label>
    //                                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
    //                                         <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
    //                                         <p className="text-gray-500">Take a photo or upload one</p>
    //                                     </div>
    //                                 </div>
    //                                 <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
    //                                     Mark as Completed
    //                                 </Button>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     {/* Right Sidebar */}
    //                     <div className="space-y-6">
    //                         {/* Employee Reports */}
    //                         <div className="bg-white border rounded-lg p-6">
    //                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Reports</h3>
    //                             <div className="space-y-3">
    //                                 <div className="flex items-center justify-between">
    //                                     <div className="flex items-center space-x-3">
    //                                         <img
    //                                             src={workOrder.assignee.avatar}
    //                                             alt={workOrder.assignee.name}
    //                                             className="w-8 h-8 rounded-full"
    //                                         />
    //                                         <span className="font-medium">{workOrder.assignee.name}</span>
    //                                     </div>
    //                                     <span className="text-gray-600">16h</span>
    //                                 </div>
    //                                 <div className="border-t pt-3">
    //                                     <div className="flex justify-between font-semibold">
    //                                         <span>Total hours</span>
    //                                         <span>16h</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>

    //                         {/* Billing Information */}
    //                         <div className="bg-white border rounded-lg p-6">
    //                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
    //                             <div className="space-y-3">
    //                                 <div className="flex items-center justify-between">
    //                                     <div className="flex items-center space-x-3">
    //                                         <img
    //                                             src={workOrder.initiator.avatar}
    //                                             alt={workOrder.initiator.name}
    //                                             className="w-8 h-8 rounded-full"
    //                                         />
    //                                         <span className="font-medium">{workOrder.initiator.name}</span>
    //                                     </div>
    //                                     <span className="text-gray-600">$200</span>
    //                                 </div>
    //                                 <div className="border-t pt-3">
    //                                     <div className="flex justify-between font-semibold text-lg">
    //                                         <span>Total</span>
    //                                         <span>$245.00</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default WorkOrderDetails;
