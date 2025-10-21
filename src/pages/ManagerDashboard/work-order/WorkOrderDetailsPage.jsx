import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkOrderDetails from './components/WorkOrderDetails';
import { useManagerWorkOrderDetail } from '@/hooks/workorder.hook';

const WorkOrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { detail, isLoading, isError, refetch } = useManagerWorkOrderDetail({ id });

    const cleanUrl = (s) => (typeof s === 'string' ? s.replace(/`/g, '').trim() : '');

    // Map API detail to WorkOrderDetails component shape
    const workOrder = useMemo(() => {
        if (!detail) return null;
        const firstTech = Array.isArray(detail?.technicians) && detail.technicians.length > 0 ? detail.technicians[0] : null;
        const beforePhotos = (detail?.galleries || [])
            .filter(g => g.type === 'before')
            .map(g => ({ url: cleanUrl(g.image_path), description: g.description || '' }));
        return {
            id: detail.id,
            title: detail.title,
            description: detail.description,
            status: detail.status,
            priority: detail.priority,
            category: detail.category || detail.fequency_job_type,
            jobType: detail.job_type,
            created: detail?.created_at || '',
            due: detail?.due_date || '',
            followUp: detail?.follow_up_date || '',
            isBillable: detail?.order_type === 'Bilable',
            isHazardous: Boolean(detail?.hazardous_cleanup),
            hourlyRate: detail?.hourly_rate,
            totalWorkHours: detail?.total_work_hours,
            totalCost: detail?.total_cost,
            initiator: {
                name: detail?.manager?.name || '—',
                avatar: cleanUrl(detail?.manager?.avatar) || 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png',
            },
            assignee: {
                name: firstTech?.name || 'Unassigned',
                avatar: cleanUrl(firstTech?.avatar) || 'https://mjkasas.softvencefsd.xyz/assets/img/user_placeholder.png',
            },
            location: detail?.location || '—',
            documents: (detail?.galleries || []).length,
            signature: cleanUrl(detail?.signature || ''),
            beforePhotos,
        };
    }, [detail]);

    const handleBackToList = () => {
        navigate('/work-order');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading work order details...</p>
                </div>
            </div>
        );
    }

    if (isError || !workOrder) {
        return (
            <div className="space-y-6">
                {/* Back Button */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={handleBackToList}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Work Orders</span>
                    </Button>
                </div>

                {/* Not Found */}
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Order Not Found</h2>
                    <p className="text-gray-600 mb-6">The work order you're looking for doesn't exist or failed to load.</p>
                    <div className="space-x-2">
                        <Button onClick={handleBackToList} className="bg-purple-600 hover:bg-purple-700">
                            Back to Work Orders
                        </Button>
                        <Button variant="outline" onClick={() => refetch()}>
                            Retry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    onClick={handleBackToList}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Work Orders</span>
                </Button>
            </div>

            {/* Details Content */}
            <WorkOrderDetails
                workOrder={workOrder}
                isPageView={true}
            />
        </div>
    );
};

export default WorkOrderDetailsPage;
