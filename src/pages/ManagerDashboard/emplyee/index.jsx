import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, X, User } from 'lucide-react';
import { useManagerUsers, useCreateManagerUser, useUpdateManagerUser, useDeleteManagerUser } from '@/hooks/manageremplyee.hook';

const Employee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        position: ''
    });
    const [editFormData, setEditFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        position: ''
    });

    const { employees = [], isLoading } = useManagerUsers({ page: 1, perPage: 15 });
    const createEmployee = useCreateManagerUser();
    const updateEmployee = useUpdateManagerUser();
    const deleteEmployee = useDeleteManagerUser();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEditInputChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createEmployee.mutate(
            {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
                position: formData.position,
            },
            {
                onSuccess: () => {
                    setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        employeeId: '',
                        department: '',
                        position: ''
                    });
                    setIsModalOpen(false);
                }
            }
        );
    };

    const handleEditEmployee = (employeeId) => {
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
            setEditingEmployee(employee);
            setEditFormData({
                fullName: employee.fullName,
                email: employee.email,
                phone: employee.phone,
                employeeId: employee.employeeId,
                department: employee.department,
                position: employee.position
            });
            setIsEditModalOpen(true);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateEmployee.mutate(
            {
                id: editingEmployee?.id,
                name: editFormData.fullName,
                email: editFormData.email,
                phone: editFormData.phone,
                department: editFormData.department,
                position: editFormData.position,
            },
            {
                onSuccess: () => {
                    setEditFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        employeeId: '',
                        department: '',
                        position: ''
                    });
                    setEditingEmployee(null);
                    setIsEditModalOpen(false);
                }
            }
        );
    };

    const handleDeleteEmployee = (employeeId) => {
        deleteEmployee.mutate(
            { id: employeeId },
            {
                onSuccess: () => {
                    // No extra action needed; list will refetch via invalidation
                }
            }
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                    <p className="text-gray-600">Manage employee roles and permissions</p>
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                            <Plus className="h-4 w-4" />
                            <span>Add Employee</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center justify-between">
                                <span>Add New Employee</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsModalOpen(false)}
                                    className="h-6 w-6 p-0"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <Input
                                    placeholder="Enter full name"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <Input
                                    placeholder="Enter mobile number"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <Input
                                    placeholder="construction or janitorial"
                                    value={formData.department}
                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                <Input
                                    placeholder="Enter position"
                                    value={formData.position}
                                    onChange={(e) => handleInputChange('position', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-gray-900 text-white hover:bg-gray-800"
                                    disabled={createEmployee.isPending}
                                >
                                    {createEmployee.isPending ? 'Adding…' : 'Add Employee'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Edit Employee Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center justify-between">
                                <span>Edit Employee</span>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="h-6 w-6 p-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <Input
                                    placeholder="Enter full name"
                                    value={editFormData.fullName}
                                    onChange={(e) => handleEditInputChange('fullName', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={editFormData.email}
                                    onChange={(e) => handleEditInputChange('email', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <Input
                                    placeholder="Enter mobile number"
                                    value={editFormData.phone}
                                    onChange={(e) => handleEditInputChange('phone', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <Input
                                    placeholder="construction or janitorial"
                                    value={editFormData.department}
                                    onChange={(e) => handleEditInputChange('department', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                <Input
                                    placeholder="Enter position"
                                    value={editFormData.position}
                                    onChange={(e) => handleEditInputChange('position', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-gray-900 text-white hover:bg-gray-800"
                                    disabled={updateEmployee.isPending}
                                >
                                    {updateEmployee.isPending ? 'Updating…' : 'Update Employee'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium text-gray-900">Full Name</TableHead>
                            <TableHead className="font-medium text-gray-900">Email</TableHead>
                            <TableHead className="font-medium text-gray-900">Phone</TableHead>
                            <TableHead className="font-medium text-gray-900">Employee Id</TableHead>
                            <TableHead className="font-medium text-gray-900">Department</TableHead>
                            <TableHead className="font-medium text-gray-900">Position</TableHead>
                            <TableHead className="font-medium text-gray-900">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-600 py-6">Loading employees…</TableCell>
                            </TableRow>
                        ) : employees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-600 py-6">No employees found</TableCell>
                            </TableRow>
                        ) : (
                            employees.map((employee) => (
                                <TableRow key={employee.id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                                {employee.avatar ? (
                                                    <img
                                                        src={employee.avatar}
                                                        alt={employee.fullName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-4 w-4 text-gray-500" />
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">{employee.fullName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{employee.email}</TableCell>
                                    <TableCell className="text-gray-600">{employee.phone}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                            {employee.employeeId}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{employee.department}</TableCell>
                                    <TableCell className="text-gray-600">{employee.position}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditEmployee(employee.id)}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteEmployee(employee.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                disabled={deleteEmployee.isPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Employee;