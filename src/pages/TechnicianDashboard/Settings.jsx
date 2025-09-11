import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Edit3, LogOut } from 'lucide-react';

const Settings = () => {
    const [profileData, setProfileData] = useState({
        fullName: 'Esther Howard',
        email: 'esther@company.com',
        phone: '+1 (555) 123-4567',
        employeeId: 'EMP-001',
        department: 'Maintenance',
        position: 'Senior Technician'
    });

    const [editProfileData, setEditProfileData] = useState({ ...profileData });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [notifications, setNotifications] = useState({
        pushNotifications: true,
        emailNotifications: false,
        workOrderUpdates: true,
        inspectionReminders: true
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleEditProfileChange = (field, value) => {
        setEditProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNotificationChange = (field, value) => {
        setNotifications(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveProfile = () => {
        setProfileData({ ...editProfileData });
        setIsEditModalOpen(false);
        console.log('Saving profile:', editProfileData);
    };

    const handleCancelEdit = () => {
        setEditProfileData({ ...profileData });
        setIsEditModalOpen(false);
    };

    const handleUpdatePassword = () => {
        console.log('Updating password');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };


    return (
        <div className=" min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Profile Settings Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Profile settings</h1>
                </div>

                {/* Profile & Settings Section */}
                <div className=" rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Profile & Settings</h2>
                        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-2">
                                    <Edit3 className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Edit Personal Information</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div>
                                        <Label htmlFor="edit-fullName">Full Name</Label>
                                        <Input
                                            id="edit-fullName"
                                            value={editProfileData.fullName}
                                            onChange={(e) => handleEditProfileChange('fullName', e.target.value)}
                                            placeholder="Enter complete name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-email">Email</Label>
                                        <Input
                                            id="edit-email"
                                            value={editProfileData.email}
                                            onChange={(e) => handleEditProfileChange('email', e.target.value)}
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-phone">Phone</Label>
                                        <Input
                                            id="edit-phone"
                                            value={editProfileData.phone}
                                            onChange={(e) => handleEditProfileChange('phone', e.target.value)}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-employeeId">Employee Id</Label>
                                        <Input
                                            id="edit-employeeId"
                                            value={editProfileData.employeeId}
                                            onChange={(e) => handleEditProfileChange('employeeId', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-department">Department</Label>
                                        <Input
                                            id="edit-department"
                                            value={editProfileData.department}
                                            onChange={(e) => handleEditProfileChange('department', e.target.value)}
                                            placeholder="Enter department name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-position">Position</Label>
                                        <Input
                                            id="edit-position"
                                            value={editProfileData.position}
                                            onChange={(e) => handleEditProfileChange('position', e.target.value)}
                                            placeholder="Enter position"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSaveProfile}>
                                        Save
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                            {/* Profile Avatar */}
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                    <User className="w-8 h-8 text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{profileData.fullName}</h4>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                                    <p className="text-gray-900">{profileData.fullName}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                                    <p className="text-gray-900">{profileData.email}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                                    <p className="text-gray-900">{profileData.phone}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Employee ID</Label>
                                    <p className="text-gray-900">{profileData.employeeId}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Department</Label>
                                    <p className="text-gray-900">{profileData.department}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Position</Label>
                                    <p className="text-gray-900">{profileData.position}</p>
                                </div>
                            </div>
                        </div>

                        {/* Work Summary */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Summary</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Work Order</Label>
                                    <p className="text-gray-900">January 15, 2024</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Completion Orders</Label>
                                    <p className="text-gray-900">240</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Average Rating</Label>
                                    <p className="text-gray-900">4.8/5.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-gray-500">Receive push notifications about new work orders and updates</p>
                            </div>
                            <Switch
                                checked={notifications.pushNotifications}
                                onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                            />
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input
                                id="current-password"
                                type="password"
                                placeholder="Enter current password"
                                value={passwordData.currentPassword}
                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                type="password"
                                placeholder="Enter new password"
                                value={passwordData.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm new password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            />
                        </div>
                        <Button onClick={handleUpdatePassword} className="bg-gray-900 hover:bg-gray-800">
                            Update password
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Settings;
