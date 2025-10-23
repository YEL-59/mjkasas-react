import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Edit, User } from 'lucide-react';
import { useManagerAuthUser, useUpdateManagerAuthUser, useUpdateManagerPassword } from '@/hooks/managerProfile.hook';

const Settings = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);

    const { user, isLoading: authLoading } = useManagerAuthUser();
    const updateProfile = useUpdateManagerAuthUser();
    const updatePassword = useUpdateManagerPassword();

    const [personalInfo, setPersonalInfo] = useState({
        fullName: 'John Doe',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@company.com',
        position: 'Manager'
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Hydrate form with auth user data
    useEffect(() => {
        if (user) {
            setPersonalInfo(prev => ({
                ...prev,
                fullName: user.name || '',
                phone: user.phone || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handlePersonalInfoChange = (field, value) => {
        setPersonalInfo(prev => ({
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

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        updatePassword.mutate(
            {
                old_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
                new_password_confirmation: passwordData.confirmPassword,
            },
            {
                onSuccess: () => {
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }
            }
        );
    };

    const handleSavePersonalInfo = () => {
        updateProfile.mutate(
            {
                name: personalInfo.fullName,
                email: personalInfo.email,
                phone: personalInfo.phone,
                avatarFile,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                }
            }
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
                        <p className="text-gray-600">Manage your account information and preferences.</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <Edit className="h-5 w-5" />
                </Button>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-8">
                {/* Personal Information Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>

                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mb-4">
                            <User className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{personalInfo.fullName || user?.name || '—'}</h3>
                        {isEditing && (
                            <div className="mt-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Personal Info Form - Two Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <Input
                                value={personalInfo.fullName}
                                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                                disabled={!isEditing || authLoading}
                                className="bg-gray-50 border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <Input
                                value={personalInfo.phone}
                                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                                disabled={!isEditing || authLoading}
                                className="bg-gray-50 border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <Input
                                value={personalInfo.email}
                                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                                disabled={!isEditing || authLoading}
                                className="bg-gray-50 border-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <Input
                                value={personalInfo.position}
                                onChange={(e) => handlePersonalInfoChange('position', e.target.value)}
                                disabled={true}
                                className="bg-gray-50 border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Save Button for Personal Info */}
                    {isEditing && (
                        <div className="flex justify-end mt-6">
                            <Button
                                onClick={handleSavePersonalInfo}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                                disabled={updateProfile.isPending}
                            >
                                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Change Password Section */}
                <div className="border-t pt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your current password"
                                value={passwordData.currentPassword}
                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                className="bg-gray-50 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                value={passwordData.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                className="bg-gray-50 border-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                className="bg-gray-50 border-gray-300"
                                required
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                                disabled={updatePassword.isPending}
                            >
                                {updatePassword.isPending ? 'Updating...' : 'Update password'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;