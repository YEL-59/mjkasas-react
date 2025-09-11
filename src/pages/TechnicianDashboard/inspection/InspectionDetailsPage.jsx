import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Camera, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const InspectionDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        customerName: 'Richard',
        buildingName: 'Richard',
        contactName: 'Richard',
        inspectorName: '',
        assigneeName: '',
        dateOfInspection: '',
        dateOfCompletion: ''
    });
    const [completionNote, setCompletionNote] = useState('');
    const [beforePhotos, setBeforePhotos] = useState([
        {
            id: 1,
            image: '/api/placeholder/400/300',
            description: 'Broken window with visible crack. Requires immediate replacement.'
        }
    ]);
    const [afterPhotos, setAfterPhotos] = useState([
        {
            id: 1,
            image: '/api/placeholder/400/300',
            description: ''
        }
    ]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddBeforePhoto = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newPhoto = {
                        id: Date.now() + Math.random(),
                        image: e.target.result,
                        description: ''
                    };
                    setBeforePhotos(prev => [...prev, newPhoto]);
                };
                reader.readAsDataURL(file);
            });
        };
        input.click();
    };

    const handleAddAfterPhoto = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newPhoto = {
                        id: Date.now() + Math.random(),
                        image: e.target.result,
                        description: ''
                    };
                    setAfterPhotos(prev => [...prev, newPhoto]);
                };
                reader.readAsDataURL(file);
            });
        };
        input.click();
    };

    const handleRemoveAfterPhoto = (photoId) => {
        setAfterPhotos(prev => prev.filter(photo => photo.id !== photoId));
    };

    const handlePhotoDescriptionChange = (photoId, description) => {
        setAfterPhotos(prev => prev.map(photo =>
            photo.id === photoId ? { ...photo, description } : photo
        ));
    };

    const handleCompleteInspection = () => {
        console.log('Completing inspection:', {
            formData,
            completionNote,
            beforePhotos,
            afterPhotos
        });
        // Navigate back to inspection list
        navigate('/technician/inspection');
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Inspection</h1>
            </div>

            {/* Form Fields Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">Customer Name</Label>
                        <Input
                            id="customerName"
                            value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="buildingName" className="text-sm font-medium text-gray-700">Building Name</Label>
                        <Input
                            id="buildingName"
                            value={formData.buildingName}
                            onChange={(e) => handleInputChange('buildingName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">Contact Name</Label>
                        <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => handleInputChange('contactName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="inspectorName" className="text-sm font-medium text-gray-700">Inspector Name</Label>
                        <Input
                            id="inspectorName"
                            placeholder="Enter inspector name..."
                            value={formData.inspectorName}
                            onChange={(e) => handleInputChange('inspectorName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="assigneeName" className="text-sm font-medium text-gray-700">Assignee Name</Label>
                        <Input
                            id="assigneeName"
                            placeholder="Enter work order ID"
                            value={formData.assigneeName}
                            onChange={(e) => handleInputChange('assigneeName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="dateOfInspection" className="text-sm font-medium text-gray-700">Date of Inspection</Label>
                        <div className="relative">
                            <Input
                                id="dateOfInspection"
                                type="text"
                                placeholder="mm/dd/yyyy"
                                value={formData.dateOfInspection}
                                onChange={(e) => handleInputChange('dateOfInspection', e.target.value)}
                                className="w-full pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfCompletion" className="text-sm font-medium text-gray-700">Date of Completion</Label>
                        <div className="relative">
                            <Input
                                id="dateOfCompletion"
                                type="text"
                                placeholder="mm/dd/yyyy"
                                value={formData.dateOfCompletion}
                                onChange={(e) => handleInputChange('dateOfCompletion', e.target.value)}
                                className="w-full pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Before Photos Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Before Photos</h2>
                <div className="space-y-4">
                    {beforePhotos.map((photo) => (
                        <div key={photo.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                <img
                                    src={photo.image}
                                    alt="Before photo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Textarea
                                value={photo.description}
                                onChange={(e) => {
                                    setBeforePhotos(prev => prev.map(p =>
                                        p.id === photo.id ? { ...p, description: e.target.value } : p
                                    ));
                                }}
                                placeholder="Enter photo description..."
                                rows={3}
                                className="w-full"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleAddBeforePhoto}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                    >
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Add Before Photo</p>
                    </button>
                </div>
            </div>

            {/* After Photos Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">After Photos</h2>
                <div className="space-y-4">
                    {afterPhotos.map((photo) => (
                        <div key={photo.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                <img
                                    src={photo.image}
                                    alt="After photo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor={`photo-desc-${photo.id}`} className="text-sm font-medium text-gray-700">Photo Description</Label>
                                    <Input
                                        id={`photo-desc-${photo.id}`}
                                        placeholder="Enter photo description..."
                                        value={photo.description}
                                        onChange={(e) => handlePhotoDescriptionChange(photo.id, e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <Button
                                    onClick={() => handleRemoveAfterPhoto(photo.id)}
                                    variant="destructive"
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddAfterPhoto}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                    >
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Add After Photo</p>
                    </button>
                </div>
            </div>

            {/* Completion Note Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Completion Note</h2>
                <Textarea
                    value={completionNote}
                    onChange={(e) => setCompletionNote(e.target.value)}
                    placeholder="Describe the work to be done"
                    rows={6}
                    className="w-full"
                />
            </div>

            {/* Complete Inspection Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleCompleteInspection}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
                >
                    Complete Inspection
                </Button>
            </div>
        </div>
    );
};

export default InspectionDetailsPage;
