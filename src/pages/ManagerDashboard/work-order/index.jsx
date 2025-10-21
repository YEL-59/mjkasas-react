import React, { useMemo, useState } from 'react';
import { Eye, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import WorkOrderCard from './components/WorkOrderCard';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { useManagerWorkOrders } from '@/hooks/workorder.hook';

const WorkOrder = () => {
    const navigate = useNavigate();

    // Pagination state
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const { workOrders, pageInfo, isLoading, isError, refetch } = useManagerWorkOrders({ page, perPage });

    // Helper to sanitize API avatar URLs that may include backticks/spaces
    const cleanUrl = (s) => (typeof s === 'string' ? s.replace(/`/g, '').trim() : '');

    // Map API fields to card props
    const cards = useMemo(() => {
        return (workOrders || []).map((wo) => {
            const category = wo?.category || wo?.fequency_job_type || '';
            const iconColor = category === 'Construction' ? 'bg-orange-500' : category === 'Janitorial' ? 'bg-green-500' : 'bg-gray-500';
            const icon = category === 'Construction' ? 'T' : category === 'Janitorial' ? '🌿' : 'W';
            const firstTech = Array.isArray(wo?.technicians) && wo.technicians.length > 0 ? wo.technicians[0] : null;

            return {
                id: wo.id,
                title: wo.title,
                description: wo.description,
                status: wo.status || 'Assigned',
                isHazardous: Boolean(wo?.hazardous_cleanup),
                isBillable: (wo?.order_type === 'Bilable'),
                created: wo?.created_at || '—',
                jobType: wo?.job_type || '—',
                due: wo?.due_date || '—',
                initiator: {
                    name: wo?.manager?.name || '—',
                    avatar: cleanUrl(wo?.manager?.avatar) || 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png',
                },
                assignee: {
                    name: firstTech?.name || 'Unassigned',
                    avatar: cleanUrl(firstTech?.avatar) || 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png',
                },
                location: wo?.location || '—',
                icon,
                iconColor,
            };
        });
    }, [workOrders]);

    const handleCreateWorkOrder = () => {
        navigate('/create-work-order');
    };

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(pageInfo?.lastPage || p + 1, p + 1));

    // Show list view
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
                    <p className="text-[#858D9D] mt-1">Manage and track all work orders across your facilities</p>
                </div>
                <div>
                    <Button
                        onClick={handleCreateWorkOrder}
                        className="bg-black hover:bg-[#5a5a5a] text-white px-4 py-5 rounded-lg flex items-center space-x-2"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create work order</span>
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Status Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <Select defaultValue="assigned">
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Type Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <Select defaultValue="construction">
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="construction">Construction</SelectItem>
                                <SelectItem value="janitorial">Janitorial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Buildings Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Buildings</label>
                        <Select defaultValue="all">
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select building" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Buildings</SelectItem>
                                <SelectItem value="riverside">Riverside Apartment Complex</SelectItem>
                                <SelectItem value="downtown">Downtown Office Complex</SelectItem>
                                <SelectItem value="industrial">Industrial Park Building A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Filter */}
                    <div className='w-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="mm/dd/yyyy"
                                className="pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Additional Filters */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Billing
                        </Button>
                        <Button variant="outline" size="sm">
                            Non-billing
                        </Button>
                    </div>
                    {/* Per Page */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Per page</span>
                        <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); setPage(1); }}>
                            <SelectTrigger className='w-24'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Work Orders List */}
            <div className="space-y-4">
                {isLoading && (
                    <div className="text-gray-500">Loading work orders...</div>
                )}
                {isError && (
                    <div className="flex items-center justify-between p-4 border rounded">
                        <span className="text-red-600">Failed to load work orders.</span>
                        <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
                    </div>
                )}
                {!isLoading && !isError && cards.length === 0 && (
                    <div className="text-gray-500">No work orders found.</div>
                )}
                {!isLoading && !isError && cards.map((workOrder) => (
                    <WorkOrderCard
                        key={workOrder.id}
                        workOrder={workOrder}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-600">Page {pageInfo?.currentPage || page} of {pageInfo?.lastPage || 1}</div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePrev} disabled={(pageInfo?.currentPage || 1) <= 1}>Prev</Button>
                    <Button variant="outline" size="sm" onClick={handleNext} disabled={(pageInfo?.currentPage || 1) >= (pageInfo?.lastPage || 1)}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default WorkOrder;