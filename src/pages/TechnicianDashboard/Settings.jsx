import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Edit3, LogOut, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import {
  useTechnicianAuthUser,
  useUpdateTechnicianAuthUser,
  useUpdateTechnicianPassword,
} from "@/hooks/technicianProfile.hook";

const sanitizeUrl = (url) =>
  typeof url === "string" ? url.replace(/`/g, "").trim() : "";
const avatarPlaceholder =
  "https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png";

const Settings = () => {
  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useTechnicianAuthUser();
  const updateProfile = useUpdateTechnicianAuthUser();
  const updatePassword = useUpdateTechnicianPassword();

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    position: "",
    avatar: "",
  });

  const [editProfileData, setEditProfileData] = useState({
    ...profileData,
    avatarFile: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: false,
    workOrderUpdates: true,
    inspectionReminders: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (user) {
      const avatarUrl = sanitizeUrl(user.avatar) || avatarPlaceholder;
      const mapped = {
        fullName: user.name || "",
        email: user.email || "",
        phone: user?.profile?.phone || "",
        employeeId: user?.profile?.employ_id || "",
        department: user?.profile?.department || "",
        position: user?.profile?.position || "",
        avatar: avatarUrl,
      };
      setProfileData(mapped);
      setEditProfileData({ ...mapped, avatarFile: null });
    }
  }, [user]);

  const handleEditProfileChange = (field, value) => {
    setEditProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditProfileData((prev) => ({ ...prev, avatarFile: file }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveProfile = () => {
    const payload = {
      name: editProfileData.fullName,
      email: editProfileData.email,
      phone: editProfileData.phone,
      avatarFile: editProfileData.avatarFile || null,
    };
    updateProfile.mutate(payload, {
      onSuccess: (res) => {
        const updated = res?.data || null;
        if (updated) {
          const avatarUrl = sanitizeUrl(updated.avatar) || avatarPlaceholder;
          const mapped = {
            fullName: updated.name || editProfileData.fullName,
            email: updated.email || editProfileData.email,
            phone: updated?.profile?.phone ?? editProfileData.phone,
            employeeId:
              updated?.profile?.employ_id ?? editProfileData.employeeId,
            department:
              updated?.profile?.department ?? editProfileData.department,
            position: updated?.profile?.position ?? editProfileData.position,
            avatar: avatarUrl,
          };
          setProfileData(mapped);
          setEditProfileData({ ...mapped, avatarFile: null });
        }
        setIsEditModalOpen(false);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update profile");
      },
    });
  };

  const handleCancelEdit = () => {
    setEditProfileData({ ...profileData, avatarFile: null });
    setIsEditModalOpen(false);
  };


  const handleUpdatePassword = () => {
    // reset errors
    setPasswordErrors({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });

    let hasError = false;
    if (!passwordData.currentPassword) {
      hasError = true;
      setPasswordErrors((prev) => ({
        ...prev,
        old_password: "Current password is required",
      }));
    }
    if (!passwordData.newPassword) {
      hasError = true;
      setPasswordErrors((prev) => ({
        ...prev,
        new_password: "New password is required",
      }));
    }
    if (
      !passwordData.confirmPassword ||
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      hasError = true;
      setPasswordErrors((prev) => ({
        ...prev,
        new_password_confirmation: "Passwords do not match",
      }));
    }
    if (hasError) return;

    // Debug logging
    console.log("Password data being sent:", {
      old_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
      new_password_confirmation: passwordData.confirmPassword,
    });

    updatePassword.mutate(
      {
        old_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        new_password_confirmation: passwordData.confirmPassword,
      },
      {
        onSuccess: () => {
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setPasswordErrors({
            old_password: "",
            new_password: "",
            new_password_confirmation: "",
          });
        },
        onError: (error) => {
          const fieldErrors = error?.response?.data?.error || {};
          setPasswordErrors({
            old_password: Array.isArray(fieldErrors?.old_password)
              ? fieldErrors.old_password[0]
              : "",
            new_password: Array.isArray(fieldErrors?.new_password)
              ? fieldErrors.new_password[0]
              : "",
            new_password_confirmation: Array.isArray(
              fieldErrors?.new_password_confirmation
            )
              ? fieldErrors.new_password_confirmation[0]
              : "",
          });
        },
      }
    );
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Settings Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile settings</h1>
          {isUserLoading && (
            <p className="text-sm text-gray-500 mt-2">Loading profile...</p>
          )}
          {isUserError && (
            <p className="text-sm text-red-600 mt-2">Failed to load profile</p>
          )}
        </div>

        {/* Profile & Settings Section */}
        <div className=" rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile & Settings
            </h2>
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
                      onChange={(e) =>
                        handleEditProfileChange("fullName", e.target.value)
                      }
                      placeholder="Enter complete name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      value={editProfileData.email}
                      onChange={(e) =>
                        handleEditProfileChange("email", e.target.value)
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={editProfileData.phone}
                      onChange={(e) =>
                        handleEditProfileChange("phone", e.target.value)
                      }
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-avatar">Avatar</Label>
                    <Input
                      id="edit-avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-employeeId">Employee Id</Label>
                    <Input
                      id="edit-employeeId"
                      value={editProfileData.employeeId}
                      onChange={(e) =>
                        handleEditProfileChange("employeeId", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-department">Department</Label>
                    <Input
                      id="edit-department"
                      value={editProfileData.department}
                      onChange={(e) =>
                        handleEditProfileChange("department", e.target.value)
                      }
                      placeholder="Enter department name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-position">Position</Label>
                    <Input
                      id="edit-position"
                      value={editProfileData.position}
                      onChange={(e) =>
                        handleEditProfileChange("position", e.target.value)
                      }
                      placeholder="Enter position"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={updateProfile.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              {/* Profile Avatar */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mr-4">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt="Avatar"
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {profileData.fullName || "—"}
                  </h4>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <p className="text-gray-900">{profileData.fullName || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <p className="text-gray-900">{profileData.email || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <p className="text-gray-900">{profileData.phone || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Employee ID
                  </Label>
                  <p className="text-gray-900">
                    {profileData.employeeId || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Department
                  </Label>
                  <p className="text-gray-900">
                    {profileData.department || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Position
                  </Label>
                  <p className="text-gray-900">{profileData.position || "—"}</p>
                </div>
              </div>
            </div>

            {/* Work Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Work Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Joining Date
                  </Label>
                  <p className="text-gray-900">{user?.joining_date || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Completion Orders
                  </Label>
                  <p className="text-gray-900">
                    {user?.completed_work_orders_count ?? "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Average Rating
                  </Label>
                  <p className="text-gray-900">4.8/5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive push notifications about new work orders and updates
                </p>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) =>
                  handleNotificationChange("pushNotifications", checked)
                }
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Change Password
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={passwordVisibility.currentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => {
                    handlePasswordChange("currentPassword", e.target.value);
                    // Clear error when user starts typing
                    if (passwordErrors.old_password) {
                      setPasswordErrors(prev => ({ ...prev, old_password: "" }));
                    }
                  }}
                  className={`pr-10 ${passwordErrors.old_password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {passwordVisibility.currentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordErrors.old_password && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.old_password}</p>
              )}
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => {
                    handlePasswordChange("newPassword", e.target.value);
                    // Clear error when user starts typing
                    if (passwordErrors.new_password) {
                      setPasswordErrors(prev => ({ ...prev, new_password: "" }));
                    }
                  }}
                  className={`pr-10 ${passwordErrors.new_password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {passwordVisibility.newPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordErrors.new_password && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.new_password}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={passwordVisibility.confirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => {
                    handlePasswordChange("confirmPassword", e.target.value);
                    // Clear error when user starts typing
                    if (passwordErrors.new_password_confirmation) {
                      setPasswordErrors(prev => ({ ...prev, new_password_confirmation: "" }));
                    }
                  }}
                  className={`pr-10 ${passwordErrors.new_password_confirmation ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {passwordVisibility.confirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordErrors.new_password_confirmation && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.new_password_confirmation}</p>
              )}
            </div>
            <Button
              onClick={handleUpdatePassword}
              className="bg-gray-900 hover:bg-gray-800"
              disabled={updatePassword.isPending}
            >
              {updatePassword.isPending ? "Updating..." : "Update password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
