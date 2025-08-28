import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const CreateInspection = () => {
    const navigate = useNavigate();
    const [inspectionDate, setInspectionDate] = useState(null);
    const [completionDate, setCompletionDate] = useState(null);
    const [beforePhotos, setBeforePhotos] = useState([]);
    const [afterPhotos, setAfterPhotos] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        buildingName: '',
        contactName: '',
        inspectorName: '',
        assigneeName: '',
        addInspector: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBeforePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = files.map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            url: URL.createObjectURL(file),
            description: ''
        }));
        setBeforePhotos(prev => [...prev, ...newPhotos]);
    };

    const handleAfterPhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = files.map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            url: URL.createObjectURL(file),
            description: ''
        }));
        setAfterPhotos(prev => [...prev, ...newPhotos]);
    };

    const handleRemoveAfterPhoto = (photoId) => {
        setAfterPhotos(prev => prev.filter(photo => photo.id !== photoId));
    };

    const handlePhotoDescriptionChange = (photoId, description, isBefore = true) => {
        if (isBefore) {
            setBeforePhotos(prev => prev.map(photo =>
                photo.id === photoId ? { ...photo, description } : photo
            ));
        } else {
            setAfterPhotos(prev => prev.map(photo =>
                photo.id === photoId ? { ...photo, description } : photo
            ));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inspection form data:', {
            ...formData,
            inspectionDate,
            completionDate,
            beforePhotos,
            afterPhotos
        });
        // Handle form submission logic here
        navigate('/inspection');
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Inspection</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                {/* Customer Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <Input
                        placeholder="Enter customer name"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        required
                    />
                </div>

                {/* Building Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
                    <Input
                        placeholder="Enter Building name..."
                        value={formData.buildingName}
                        onChange={(e) => handleInputChange('buildingName', e.target.value)}
                        required
                    />
                </div>

                {/* Contact Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <Input
                        placeholder="Enter contact name"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        required
                    />
                </div>

                {/* Inspector Name & Assignee Name - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Inspector Name</label>
                        <Input
                            placeholder="Enter Inspector name"
                            value={formData.inspectorName}
                            onChange={(e) => handleInputChange('inspectorName', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee Name</label>
                        <Input
                            placeholder="Enter Assignee name"
                            value={formData.assigneeName}
                            onChange={(e) => handleInputChange('assigneeName', e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Date of Inspection & Date of Completion - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Inspection</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {inspectionDate ? format(inspectionDate, 'MM/dd/yyyy') : <span className="text-muted-foreground">mm/dd/yyyy</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    mode="single"
                                    selected={inspectionDate}
                                    onSelect={setInspectionDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Completion</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {completionDate ? format(completionDate, 'MM/dd/yyyy') : <span className="text-muted-foreground">mm/dd/yyyy</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    mode="single"
                                    selected={completionDate}
                                    onSelect={setCompletionDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Before Photos Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Before Photos</label>
                    {beforePhotos.length > 0 && (
                        <div className="space-y-4 mb-4">
                            {beforePhotos.map((photo) => (
                                <div key={photo.id} className="space-y-2">
                                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={photo.url}
                                            alt="Before photo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Broken windows, walls visible cracks. Dampness, dust, mold, etc. Explain here."
                                        value={photo.description}
                                        onChange={(e) => handlePhotoDescriptionChange(photo.id, e.target.value, true)}
                                        className="min-h-[80px]"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('before-photos').click()}
                            className="flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Before Photos</span>
                        </Button>
                        <input
                            id="before-photos"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleBeforePhotoUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Add Inspector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Inspector</label>
                    <Input
                        placeholder="Enter Inspector name"
                        value={formData.addInspector}
                        onChange={(e) => handleInputChange('addInspector', e.target.value)}
                    />
                </div>

                {/* After Photos Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">After Photos</label>
                    {afterPhotos.length > 0 && (
                        <div className="space-y-4 mb-4">
                            {afterPhotos.map((photo) => (
                                <div key={photo.id} className="space-y-2">
                                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                                        <img
                                            src={photo.url}
                                            alt="After photo"
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveAfterPhoto(photo.id)}
                                            className="absolute top-2 right-2 h-8 w-8 p-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Textarea
                                        placeholder="Photo description..."
                                        value={photo.description}
                                        onChange={(e) => handlePhotoDescriptionChange(photo.id, e.target.value, false)}
                                        className="min-h-[80px]"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('after-photos').click()}
                            className="flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add After Photos</span>
                        </Button>
                        <input
                            id="after-photos"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleAfterPhotoUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Complete Inspection Button */}
                <div className="flex justify-end pt-6">
                    <Button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                    >
                        Complete Inspection
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateInspection;
