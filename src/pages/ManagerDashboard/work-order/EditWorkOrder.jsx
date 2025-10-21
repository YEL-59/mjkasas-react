import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useManagerWorkOrderDetail, useUpdateWorkOrder, mapToApiPayload } from '@/hooks/workorder.hook';
import CreateWorkOrder from '../CreateWorkOrder';

const EditWorkOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // FIX: call hook with an options object { id }
    const { detail: workOrder, isLoading, isError } = useManagerWorkOrderDetail({ id });
    const updateWorkOrder = useUpdateWorkOrder();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-600 mb-4">Failed to load work order</p>
                <button
                    onClick={() => navigate('/work-order')}
                    className="text-blue-600 hover:underline"
                >
                    Back to Work Orders
                </button>
            </div>
        );
    }

    if (!workOrder) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-600 mb-4">Work order not found</p>
                <button
                    onClick={() => navigate('/work-order')}
                    className="text-blue-600 hover:underline"
                >
                    Back to Work Orders
                </button>
            </div>
        );
    }

    // Transform API data to form initial values
    const firstTech = Array.isArray(workOrder?.technicians) && workOrder.technicians.length > 0
        ? String(workOrder.technicians[0]?.id ?? '')
        : '';

    // Normalize category to UI enum values for the radio group
    const normalizedCategory = workOrder.category === 'Construction'
        ? 'construction'
        : workOrder.category === 'Janitorial'
        ? 'janitorial'
        : (workOrder.category || 'construction');

    const initialValues = {
        fequency_job_type: workOrder.fequency_job_type,
        title: workOrder.title,
        description: workOrder.description,
        jobType: workOrder.job_type,
        hourlyRate: parseFloat(workOrder.hourly_rate ?? 0),
        dueDate: workOrder.due_date,
        followUpDate: workOrder.follow_up_date,
        location: workOrder.location,
        technician: firstTech,
        category: normalizedCategory,
        hazardousCleanup: (workOrder.hazardous_cleanup === 1 || workOrder.hazardous_cleanup === '1' || workOrder.hazardous_cleanup === true) ? 'yes' : 'no',
        priority: (workOrder.priority || 'Normal').toLowerCase(),
        orderType: workOrder.order_type === 'Bilable' ? 'billable' : 'non-billable',
        recurringWorkOrder: !!(workOrder.one_week || workOrder.two_week || workOrder.six_hour),
        recurringOptions: {
            oneWeek: !!workOrder.one_week,
            twoWeeks: !!workOrder.two_week,
            sixHours: !!workOrder.six_hour
        }
    };

    const handleSubmit = async (formValues) => {
        // Use the same mapping as creation to ensure API-compatible payload
        const payload = mapToApiPayload(formValues);

        await updateWorkOrder.mutateAsync(
            { id, data: payload },
            {
                onSuccess: () => {
                    navigate(`/work-order/${id}`);
                }
            }
        );
    };

    return (
        <CreateWorkOrder
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isEdit={true}
        />
    );
};

export default EditWorkOrder;