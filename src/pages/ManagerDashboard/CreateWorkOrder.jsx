import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X, PenTool } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Zod schema for form validation
const workOrderSchema = z.object({
    title: z.string().min(1, 'Work order title is required'),
    description: z.string().min(1, 'Description is required'),
    jobType: z.string().min(1, 'Job type is required'),
    hourlyRate: z.number().min(0, 'Hourly rate must be 0 or greater'),
    dueDate: z.date(),
    followUpDate: z.date().optional(),
    location: z.string().min(1, 'Location is required'),
    assignTo: z.string().min(1, 'Employee assignment is required'),
    category: z.enum(['construction', 'janitorial']),
    hazardousCleanup: z.enum(['yes', 'no']),
    priority: z.enum(['normal', 'urgent']),
    orderType: z.enum(['billable', 'non-billable']),
    recurringWorkOrder: z.boolean(),
    frequency: z.string().optional(),
    recurringOptions: z.object({
        twoWeeks: z.boolean(),
        oneWeek: z.boolean(),
        sixHours: z.boolean(),
    }).optional(),
    beforePhotos: z.array(z.object({
        file: z.any(),
        description: z.string(),
    })),
    digitalSignature: z.string().min(1, 'Digital signature is required'),
});

export default function CreateWorkOrder() {
    const [isRecurring, setIsRecurring] = useState(false);
    const [beforePhotos, setBeforePhotos] = useState([]);
    const [signature, setSignature] = useState('');
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasRef, setCanvasRef] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(workOrderSchema),
        defaultValues: {
            recurringWorkOrder: false,
            category: 'construction',
            hazardousCleanup: 'no',
            priority: 'normal',
            orderType: 'billable',
            hourlyRate: 0,
            beforePhotos: [],
        },
    });

    const onSubmit = (data) => {
        console.log('Form data:', data);
        // Handle form submission
    };

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = files.map(file => ({
            file,
            description: '',
            preview: URL.createObjectURL(file),
        }));
        setBeforePhotos([...beforePhotos, ...newPhotos]);
    };

    const removePhoto = (index) => {
        const newPhotos = beforePhotos.filter((_, i) => i !== index);
        setBeforePhotos(newPhotos);
    };

    const clearSignature = () => {
        setSignature('');
        if (canvasRef) {
            const ctx = canvasRef.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Work Order</h1>
                <p className="text-gray-600 mt-2">Fill out the details below to create a new work order</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Recurring Work Order Section */}
                <div className="bg-gray-50 p-4 rounded-lg min-h-[120px] transition-all duration-300 ease-in-out">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Recurring Work Order</h3>
                            <p className="text-sm text-gray-600">Set up automatic scheduling and notifications</p>
                        </div>
                        <Switch
                            checked={isRecurring}
                            onCheckedChange={(checked) => {
                                setIsRecurring(checked);
                                setValue('recurringWorkOrder', checked);
                            }}
                        />
                    </div>

                    <div className={`mt-4 space-y-4 transition-all duration-300 ease-in-out ${isRecurring ? 'opacity-100 max-h-[300px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <div>
                            <Label className="text-gray-700 font-medium">Frequency</Label>
                            <Select onValueChange={(value) => setValue('frequency', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="twoWeeks"
                                    {...register('recurringOptions.twoWeeks')}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="twoWeeks" className="text-gray-700">2 weeks before due date</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="oneWeek"
                                    {...register('recurringOptions.oneWeek')}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="oneWeek" className="text-gray-700">1 week before due date</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="sixHours"
                                    {...register('recurringOptions.sixHours')}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="sixHours" className="text-gray-700">6 hours before due date</Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="title">Work Order Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter work order title"
                            {...register('title')}
                            className={cn(errors.title && 'border-red-500')}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="jobType">Job Type</Label>
                        <Select onValueChange={(value) => setValue('jobType', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cleaning">Cleaning</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="repair">Repair</SelectItem>
                                <SelectItem value="inspection">Inspection</SelectItem>
                                <SelectItem value="installation">Installation</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="hourlyRate">Hourly Rate</Label>
                        <Input
                            id="hourlyRate"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...register('hourlyRate', { valueAsNumber: true })}
                            className={cn(errors.hourlyRate && 'border-red-500')}
                        />
                        {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            placeholder="Building, Floor, Room"
                            {...register('location')}
                            className={cn(errors.location && 'border-red-500')}
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !watch('dueDate') && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {watch('dueDate') ? format(watch('dueDate'), 'PPP') : 'mm/dd/yyyy'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={watch('dueDate')}
                                    onSelect={(date) => setValue('dueDate', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="followUpDate">Follow-up Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !watch('followUpDate') && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {watch('followUpDate') ? format(watch('followUpDate'), 'PPP') : 'mm/dd/yyyy'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={watch('followUpDate')}
                                    onSelect={(date) => setValue('followUpDate', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div>
                        <Label htmlFor="assignTo">Assign to</Label>
                        <Input
                            id="assignTo"
                            placeholder="Enter employee name"
                            {...register('assignTo')}
                            className={cn(errors.assignTo && 'border-red-500')}
                        />
                        {errors.assignTo && <p className="text-red-500 text-sm mt-1">{errors.assignTo.message}</p>}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe the work to be done"
                        rows={4}
                        {...register('description')}
                        className={cn(errors.description && 'border-red-500')}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Category and Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>Category</Label>
                        <RadioGroup
                            value={watch('category')}
                            onValueChange={(value) => setValue('category', value)}
                            className="mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="construction" id="construction" />
                                <Label htmlFor="construction">Construction</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="janitorial" id="janitorial" />
                                <Label htmlFor="janitorial">Janitorial</Label>
                            </div>
                        </RadioGroup>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <Label>Hazardous Cleanup</Label>
                        <RadioGroup
                            value={watch('hazardousCleanup')}
                            onValueChange={(value) => setValue('hazardousCleanup', value)}
                            className="mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="hazardous-yes" />
                                <Label htmlFor="hazardous-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="hazardous-no" />
                                <Label htmlFor="hazardous-no">No</Label>
                            </div>
                        </RadioGroup>
                        {errors.hazardousCleanup && <p className="text-red-500 text-sm mt-1">{errors.hazardousCleanup.message}</p>}
                    </div>

                    <div>
                        <Label>Priority</Label>
                        <RadioGroup
                            value={watch('priority')}
                            onValueChange={(value) => setValue('priority', value)}
                            className="mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="normal" id="normal" />
                                <Label htmlFor="normal">Normal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="urgent" id="urgent" />
                                <Label htmlFor="urgent">Urgent</Label>
                            </div>
                        </RadioGroup>
                        {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
                    </div>

                    <div>
                        <Label>Order Type</Label>
                        <RadioGroup
                            value={watch('orderType')}
                            onValueChange={(value) => setValue('orderType', value)}
                            className="mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="billable" id="billable" />
                                <Label htmlFor="billable">Billable</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="non-billable" id="non-billable" />
                                <Label htmlFor="non-billable">Non-Billable</Label>
                            </div>
                        </RadioGroup>
                        {errors.orderType && <p className="text-red-500 text-sm mt-1">{errors.orderType.message}</p>}
                    </div>
                </div>

                {/* Before Photos */}
                <div>
                    <Label>Before Photos</Label>
                    <div className="mt-2 space-y-4">
                        {beforePhotos.map((photo, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <img
                                        src={photo.preview}
                                        alt={`Before photo ${index + 1}`}
                                        className="w-32 h-24 object-cover rounded"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removePhoto(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Photo Description"
                                    value={photo.description}
                                    onChange={(e) => {
                                        const newPhotos = [...beforePhotos];
                                        newPhotos[index].description = e.target.value;
                                        setBeforePhotos(newPhotos);
                                    }}
                                    rows={2}
                                />
                            </div>
                        ))}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('photo-upload').click()}
                                >
                                    Add Before Photo
                                </Button>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Digital Signature */}
                <div>
                    <Label>Digital Signature</Label>
                    <div className="mt-2 border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Sign above using your mouse or finger</span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={clearSignature}
                            >
                                Clear
                            </Button>
                        </div>
                        <div className="border rounded-lg bg-white">
                            <canvas
                                ref={setCanvasRef}
                                width={600}
                                height={200}
                                className="w-full h-48 cursor-crosshair"
                                onMouseDown={() => setIsDrawing(true)}
                                onMouseUp={() => setIsDrawing(false)}
                                onMouseLeave={() => setIsDrawing(false)}
                                onMouseMove={(e) => {
                                    if (isDrawing && canvasRef) {
                                        const ctx = canvasRef.getContext('2d');
                                        const rect = canvasRef.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;

                                        ctx.lineWidth = 2;
                                        ctx.lineCap = 'round';
                                        ctx.strokeStyle = '#000';
                                        ctx.lineTo(x, y);
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(x, y);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {errors.digitalSignature && <p className="text-red-500 text-sm mt-1">{errors.digitalSignature.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                    <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2">
                        Create Work Order
                    </Button>
                </div>
            </form>
        </div>
    );
}
