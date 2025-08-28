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

    // Mock employee data
    const employees = [
        {
            id: 1,
            fullName: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+555-0101',
            employeeId: 'EMP-001',
            department: 'Construction',
            position: 'Senior Technician',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        {
            id: 2,
            fullName: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+555-0101',
            employeeId: 'EMP-002',
            department: 'Construction',
            position: 'Senior Technician',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
        },
        {
            id: 3,
            fullName: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+555-0101',
            employeeId: 'EMP-003',
            department: 'Construction',
            position: 'Senior Technician',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
        },
        {
            id: 4,
            fullName: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+555-0101',
            employeeId: 'EMP-004',
            department: 'Janitorial',
            position: 'Janitorial Supervisor',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
        },
        {
            id: 5,
            fullName: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+555-0101',
            employeeId: 'EMP-005',
            department: 'Construction',
            position: 'Senior Technician',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
        }
    ];

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
        // Handle form submission
        console.log('New employee data:', formData);
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            employeeId: '',
            department: '',
            position: ''
        });
        setIsModalOpen(false);
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
        // Handle edit form submission - you can call your API here
        console.log('Updated employee data:', editFormData);
        console.log('Employee ID being edited:', editingEmployee?.id);

        // Reset form and close modal
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
    };

    const handleDeleteEmployee = (employeeId) => {
        console.log('Delete employee:', employeeId);
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
                                    placeholder="Enter Company name"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Id</label>
                                <Input
                                    placeholder="EMP-001"
                                    value={formData.employeeId}
                                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <Input
                                    placeholder="Enter department name"
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
                                >
                                    Add Employee
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
                                    placeholder="Enter Company name"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Id</label>
                                <Input
                                    placeholder="EMP-001"
                                    value={editFormData.employeeId}
                                    onChange={(e) => handleEditInputChange('employeeId', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <Input
                                    placeholder="Enter department name"
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
                                >
                                    Update Employee
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
                        {employees.map((employee) => (
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
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Employee;