import React, { useState, useEffect } from 'react';
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
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCreateWorkOrder } from '@/hooks/workorder.hook';
import { axiosPrivate } from '@/lib/axios.config';

// Zod schema for form validation
const workOrderSchema = z.object({
    title: z.string().min(1, 'Work order title is required'),
    description: z.string().min(1, 'Description is required'),
    jobType: z.string().min(1, 'Job type is required'),
    hourlyRate: z.number().min(0, 'Hourly rate must be 0 or greater'),
    dueDate: z.date(),
    followUpDate: z.date(),
    location: z.string().min(1, 'Location is required'),
    technician: z.string().min(1, 'Technician is required'),
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

    // Technician search state
    const [technicianQuery, setTechnicianQuery] = useState('');
    const [technicianResults, setTechnicianResults] = useState([]);
    const [techLoading, setTechLoading] = useState(false);
    const [techDropdownOpen, setTechDropdownOpen] = useState(false);
    const [technicianDisplay, setTechnicianDisplay] = useState('');

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
            technician: '',
        },
    });

    const { mutate, isPending } = useCreateWorkOrder();

    const onSubmit = (data) => {
        // Bind signature into form data if present
        if (signature) {
            setValue('digitalSignature', signature);
        }
        // Send to API via hook
        mutate({ values: data, photos: beforePhotos });
    };

    // Debounced technician search
    useEffect(() => {
        const q = technicianQuery.trim();
        if (q.length < 2) {
            setTechnicianResults([]);
            return;
        }
        const controller = new AbortController();
        setTechLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await axiosPrivate.get('/technician/user/find-technician', {
                    params: { name: q },
                    signal: controller.signal,
                });
                const list = res?.data?.data || [];
                setTechnicianResults(list);
                setTechDropdownOpen(true);
            } catch (e) {
                // ignore for now
            } finally {
                setTechLoading(false);
            }
        }, 300);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [technicianQuery]);

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
        setValue('digitalSignature', '');
        if (canvasRef) {
            const ctx = canvasRef.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
        }
    };

    return (

        <>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Work Order</h1>
                <p className="text-gray-600 mt-2">Fill out the details below to create a new work order</p>
            </div>

            <div className="max-w-full mx-auto bg-white rounded-lg border p-6">


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Recurring Work Order Section */}
                    <div className="bg-transparent border p-4 rounded-lg min-h-[120px] transition-all duration-300 ease-in-out">
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
                                <Label className="text-[#374151] font-medium">Frequency</Label>
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

                    <div>
                        <div className='pb-5'>
                            <Label htmlFor="title" className='pb-2 text-[#374151]'>Work Order Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter work order title"
                                {...register('title')}
                                className={cn(errors.title && 'border-red-500')}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div >
                            <Label htmlFor="description" className='pb-2 text-[#374151] '>Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the work to be done"
                                {...register('description')}
                                className={cn(errors.description && 'border-red-500')}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-lg p-5">


                        <div>
                            <Label htmlFor="jobType" className='pb-2 text-[#374151]'>Job Type</Label>
                            <Select onValueChange={(value) => setValue('jobType', value)}>
                                <SelectTrigger className=' w-full'>
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Prevailing Wage">Prevailing Wage</SelectItem>
                                    <SelectItem value="Prevailing Wage OT">Prevailing Wage OT</SelectItem>
                                    <SelectItem value="Davis Bacon">Davis Bacon</SelectItem>
                                    <SelectItem value="Regular Wage">Regular Wage</SelectItem>
                                    <SelectItem value="T&M">T&M</SelectItem>
                                    <SelectItem value="Bio Hazard Cleanup">Bio Hazard Cleanup</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="hourlyRate" className='pb-2 text-[#374151] '>Hourly Rate</Label>
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
                            <Label htmlFor="location" className='pb-2 text-[#374151] '>Location</Label>
                            <Input
                                id="location"
                                placeholder="Building, Floor, Room"
                                {...register('location')}
                                className={cn(errors.location && 'border-red-500')}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="dueDate" className='pb-2 text-[#374151] '>Due Date</Label>
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
                            <Label htmlFor="followUpDate" className='pb-2 text-[#374151] '>Follow-up Date</Label>
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
                            {errors.followUpDate && <p className="text-red-500 text-sm mt-1">{errors.followUpDate.message}</p>}
                        </div>

                        {/* Technician searchable input */}
                        <div className="relative">
                            <Label htmlFor="technicianSearch" className='pb-2 text-[#374151]'>Assign to</Label>
                            <Input
                                id="technicianSearch"
                                placeholder="Search technician by name"
                                value={technicianQuery}
                                onChange={(e) => setTechnicianQuery(e.target.value)}
                                onFocus={() => setTechDropdownOpen(true)}
                                className={cn(errors.technician && 'border-red-500')}
                            />
                            {/* hidden field holds selected technician id for form validation */}
                            <input type="hidden" {...register('technician')} />

                            {techDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-auto">
                                    {techLoading && (
                                        <div className="px-3 py-2 text-sm text-gray-500">Searching...</div>
                                    )}
                                    {!techLoading && technicianResults.length === 0 && technicianQuery.trim().length >= 2 && (
                                        <div className="px-3 py-2 text-sm text-gray-500">No technicians found</div>
                                    )}
                                    {!techLoading && technicianResults.map((t) => (
                                        <button
                                            type="button"
                                            key={t.id}
                                            className="flex items-center w-full px-3 py-2 hover:bg-gray-50 text-left"
                                            onClick={() => {
                                                setTechnicianDisplay(t.name);
                                                setValue('technician', String(t.id), { shouldValidate: true });
                                                setTechDropdownOpen(false);
                                                setTechnicianQuery(t.name);
                                            }}
                                        >
                                            <img
                                                src={t.avatar || 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png'}
                                                alt={t.name}
                                                className="w-6 h-6 rounded-full mr-2"
                                            />
                                            <span className="text-sm text-gray-700">{t.name}</span>
                                            <span className="ml-auto text-xs text-gray-400">ID: {t.id}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {errors.technician && <p className="text-red-500 text-sm mt-1">{errors.technician.message}</p>}
                            {technicianDisplay && (
                                <p className="text-xs text-gray-500 mt-1">Selected: {technicianDisplay}</p>
                            )}
                        </div>

                        <div>
                            <Label>Category</Label>
                            <RadioGroup
                                value={watch('category')}
                                onValueChange={(value) => setValue('category', value)}
                                className="mt-2 text-[#374151]"
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
                    <div className='border rounded-lg p-5'>
                        <Label className="text-left text-lg font-semibold">Before Photos</Label>
                        <div className="mt-2 space-y-4">
                            {beforePhotos.map((photo, index) => (
                                <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                                    <div className="mb-3">
                                        <img
                                            src={photo.preview}
                                            alt={`Before photo ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Textarea
                                            placeholder="Photo Description"
                                            value={photo.description}
                                            onChange={(e) => {
                                                const newPhotos = [...beforePhotos];
                                                newPhotos[index].description = e.target.value;
                                                setBeforePhotos(newPhotos);
                                            }}
                                            rows={2}
                                            className="w-full border-l-2 border-dashed border-gray-300 pl-3"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-red-500 cursor-pointer" onClick={() => removePhoto(index)}>
                                        <X className="h-4 w-4" />
                                        <span className="text-sm">Remove</span>
                                    </div>
                                </div>
                            ))}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('photo-upload').click()}
                                    className="flex items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    <Upload className="h-4 w-4" />
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

                    {/* Digital Signature */}
                    <div>
                        <Label className="text-left">Digital Signature</Label>
                        <div className="mt-2">
                            <div className="border rounded-lg bg-white p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-gray-600">Sign above using your mouse or finger</span>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={clearSignature}
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="border rounded-lg bg-white h-48">
                                    <canvas
                                        ref={setCanvasRef}
                                        width={600}
                                        height={200}
                                        className="w-full h-full cursor-crosshair rounded-lg"
                                        onMouseDown={() => setIsDrawing(true)}
                                        onMouseUp={() => {
                                            setIsDrawing(false);
                                            if (canvasRef) {
                                                const dataUrl = canvasRef.toDataURL('image/png');
                                                setSignature(dataUrl);
                                                setValue('digitalSignature', dataUrl);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setIsDrawing(false);
                                            if (canvasRef) {
                                                const dataUrl = canvasRef.toDataURL('image/png');
                                                setSignature(dataUrl);
                                                setValue('digitalSignature', dataUrl);
                                            }
                                        }}
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
                        </div>
                        {errors.digitalSignature && <p className="text-red-500 text-sm mt-1">{errors.digitalSignature.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <Button type="submit" disabled={isPending} className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2">
                            {isPending ? 'Creating...' : 'Create Work Order'}
                        </Button>
                    </div>
                </form>
            </div>



        </>

    );
}
