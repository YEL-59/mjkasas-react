import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        department: 'Maintenance'
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: false,
        workOrderUpdates: true,
        inspectionReminders: true
    });

    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({
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

    const handleSaveProfile = () => {
        // In real app, this would save to API
        console.log('Saving profile:', profileData);
    };

    const handleSaveNotifications = () => {
        // In real app, this would save to API
        console.log('Saving notifications:', notifications);
    };

    return (
        <div className="p-6 space-y-8">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => handleProfileChange('name', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleProfileChange('email', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                            id="department"
                            value={profileData.department}
                            onChange={(e) => handleProfileChange('department', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                        Save Profile
                    </Button>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                            id="emailNotifications"
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="pushNotifications">Push Notifications</Label>
                            <p className="text-sm text-gray-500">Receive push notifications on mobile</p>
                        </div>
                        <Switch
                            id="pushNotifications"
                            checked={notifications.pushNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="workOrderUpdates">Work Order Updates</Label>
                            <p className="text-sm text-gray-500">Get notified about work order changes</p>
                        </div>
                        <Switch
                            id="workOrderUpdates"
                            checked={notifications.workOrderUpdates}
                            onCheckedChange={(checked) => handleNotificationChange('workOrderUpdates', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="inspectionReminders">Inspection Reminders</Label>
                            <p className="text-sm text-gray-500">Receive inspection due date reminders</p>
                        </div>
                        <Switch
                            id="inspectionReminders"
                            checked={notifications.inspectionReminders}
                            onCheckedChange={(checked) => handleNotificationChange('inspectionReminders', checked)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <Button onClick={handleSaveNotifications} className="bg-blue-600 hover:bg-blue-700">
                        Save Notifications
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
