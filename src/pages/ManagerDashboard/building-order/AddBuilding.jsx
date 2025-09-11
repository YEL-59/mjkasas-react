import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus } from 'lucide-react';

const AddBuilding = () => {
    const navigate = useNavigate();
    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        taxRate: '',
        billingName: '',
        billingAddress1: '',
        billingAddress2: '',
        billingMobile: '',
        billingEmail: '@gmail.com',
        billingNotes: '',
        contactName: '',
        contactAddress: '',
        contactMobile: '',
        contactEmail: '@gmail.com',
        contactNotes: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form data:', formData);
        navigate('/buildings');
    };

    const handleCancel = () => {
        navigate('/buildings');
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/buildings')}
                        className="flex items-center space-x-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                    <div className="h-6 w-px bg-gray-300" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Building information</h1>
                    </div>
                </div>
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Attachment
                </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8 border rounded-lg p-5">
                {/* Company Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <Input
                                placeholder="Enter Company name"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate</label>
                            <Input
                                placeholder="0.12%"
                                value={formData.taxRate}
                                onChange={(e) => handleInputChange('taxRate', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Billing Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Billing Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Name</label>
                            <Input
                                placeholder="Enter Building name"
                                value={formData.billingName}
                                onChange={(e) => handleInputChange('billingName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address Line 1</label>
                            <Input
                                placeholder="Enter your address..."
                                value={formData.billingAddress1}
                                onChange={(e) => handleInputChange('billingAddress1', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address Line 2</label>
                            <Input
                                placeholder="Enter your address..."
                                value={formData.billingAddress2}
                                onChange={(e) => handleInputChange('billingAddress2', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Mobile Number</label>
                            <Input
                                placeholder="Enter mobile number"
                                value={formData.billingMobile}
                                onChange={(e) => handleInputChange('billingMobile', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Email</label>
                            <Input
                                placeholder="@gmail.com"
                                value={formData.billingEmail}
                                onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <Textarea
                                placeholder="Write your note here..."
                                value={formData.billingNotes}
                                onChange={(e) => handleInputChange('billingNotes', e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="sameAsBilling"
                                checked={sameAsBilling}
                                onCheckedChange={setSameAsBilling}
                            />
                            <label htmlFor="sameAsBilling" className="text-sm font-medium text-gray-700">
                                Same as Billing
                            </label>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                            <Input
                                placeholder="Enter your name"
                                value={formData.contactName}
                                onChange={(e) => handleInputChange('contactName', e.target.value)}
                                disabled={sameAsBilling}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Address</label>
                            <Input
                                placeholder="Enter your address..."
                                value={formData.contactAddress}
                                onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                                disabled={sameAsBilling}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Mobile Number</label>
                            <Input
                                placeholder="Enter mobile number"
                                value={formData.contactMobile}
                                onChange={(e) => handleInputChange('contactMobile', e.target.value)}
                                disabled={sameAsBilling}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <Input
                                placeholder="@gmail.com"
                                value={formData.contactEmail}
                                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                disabled={sameAsBilling}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <Textarea
                                placeholder="Write your note here..."
                                value={formData.contactNotes}
                                onChange={(e) => handleInputChange('contactNotes', e.target.value)}
                                rows={3}
                                disabled={sameAsBilling}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800"
                    >
                        Update building information
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBuilding;
