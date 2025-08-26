import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Building2,
    Plus,
    Search,
    Calendar as CalendarIcon,
    User,
    MapPin,
    Phone,
    Mail,
    Tag,
    FileText,
    Download,
    Edit,
    Trash2,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuildingOrder = () => {
    const navigate = useNavigate();
    const [expandedBuilding, setExpandedBuilding] = useState('building-1');
    const [date, setDate] = useState();

    // Mock building data
    const buildings = [
        {
            id: 'building-1',
            name: 'Downtown Office Complex',
            address: '123 Main Street, Downtown, NY 10001',
            billingInfo: {
                name: 'Robert Miller',
                address1: '123 Business Ave',
                address2: 'Suite 100'
            },
            contactInfo: {
                name: 'Robert Miller',
                address1: '123 Business Ave',
                address2: 'Suite 100'
            },
            billingContact: {
                mobile: '+855-4567',
                email: 'robert@merpm.com',
                taxRate: '8.5%'
            },
            contactDetails: {
                mobile: '+856-4567',
                email: 'robert@merpm.com',
                taxRate: '8.5%'
            },
            notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            attachment: 'Building Contract.pdf'
        },
        {
            id: 'building-2',
            name: 'Westside Shopping Center',
            address: '456 West Ave, Westside, NY 10002'
        },
        {
            id: 'building-3',
            name: 'Industrial Park Building A',
            address: '789 Industrial Blvd, Industrial District, NY 10003'
        },
        {
            id: 'building-4',
            name: 'Riverside Apartment Complex',
            address: '321 River Road, Riverside, NY 10004'
        }
    ];

    const handleAddBuilding = () => {
        navigate('/buildings/add');
    };

    const handleEditBuilding = (buildingId) => {
        navigate(`/buildings/edit/${buildingId}`);
    };

    const handleDeleteBuilding = (buildingId) => {
        // Handle delete functionality
        console.log('Delete building:', buildingId);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Building Management</h1>
                    <p className="text-gray-600">Manage buildings and project locations with contact information</p>
                </div>
                <Button
                    onClick={handleAddBuilding}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Building</span>
                </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project list</label>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All projects</SelectItem>
                            <SelectItem value="project1">Project 1</SelectItem>
                            <SelectItem value="project2">Project 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="repair">Repair</SelectItem>
                            <SelectItem value="inspection">Inspection</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? date.toLocaleDateString() : <span className="text-muted-foreground">mm/dd/yyyy</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Buildings Accordion */}
            <Accordion
                type="single"
                collapsible
                value={expandedBuilding}
                onValueChange={setExpandedBuilding}
                className="space-y-4"
            >
                {buildings.map((building, index) => (
                    <AccordionItem key={building.id} value={building.id} className="border rounded-lg">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center space-x-3">
                                    <Building2 className="h-5 w-5 text-blue-500" />
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">{building.name}</h3>
                                        <p className="text-sm text-gray-600">{building.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditBuilding(building.id);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteBuilding(building.id);
                                        }}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            {building.billingInfo && (
                                <div className="space-y-6">
                                    {/* Two Column Layout */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            {/* Billing Information */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-gray-900">Billing Information</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <User className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Billing Name</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.billingInfo.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Billing Address-1</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.billingInfo.address1}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Billing Address-2</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.billingInfo.address2}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-gray-900">Contact Information</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <User className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Contact Name</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.contactInfo.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Contact Address-1</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.contactInfo.address1}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Contact Address-2</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.contactInfo.address2}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            {/* Contact Details for Billing */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-gray-900">Contact Details (for Billing)</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <Phone className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Mobile</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.billingContact.mobile}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Mail className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Email</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.billingContact.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Tag className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Tax Rate</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.billingContact.taxRate}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Contact Details for Contact */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-gray-900">Contact Details (for Contact)</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <Phone className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Mobile</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.contactDetails.mobile}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Mail className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Email</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.contactDetails.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Tag className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Tax Rate</p>
                                                            <p className="text-sm font-medium text-gray-900">{building.contactDetails.taxRate}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes Section */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Notes</h4>
                                        <p className="text-sm text-gray-700 border rounded-lg p-4 border-gray-200 hover:border-gray-300 transition-all duration-300">{building.notes}</p>
                                    </div>

                                    {/* Attachment Section */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium text-gray-900">Attachment</h4>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 max-w-4xl">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-900">{building.attachment}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default BuildingOrder;