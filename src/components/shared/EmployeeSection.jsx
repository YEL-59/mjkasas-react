import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import FormSection from './FormSection';
import FormInput from './FormInput';
import EmployeeField from './EmployeeField';
import { useFindTechnician, useAssignTechnician } from '@/hooks/tehnician.hook';

const EmployeeSection = ({
    fields,
    register,
    onAddEmployee,
    onRemoveEmployee,
    workOrderId,
}) => {
    const [nameQuery, setNameQuery] = useState('');
    const [selectedTech, setSelectedTech] = useState(null);
    const [localHours, setLocalHours] = useState('');

    const findQuery = useFindTechnician(nameQuery, {
        enabled: !!nameQuery && nameQuery.length > 1,
    });
    const suggestions = findQuery?.data?.data || [];

    const assignMutation = useAssignTechnician();

    const handleAssign = () => {
        if (!workOrderId) {
            console.warn('Missing workOrderId for assignment');
            return;
        }
        if (!selectedTech?.id) {
            console.warn('Select a technician before assigning');
            return;
        }
        const parsedHours = localHours !== '' ? Number(localHours) : undefined;
        assignMutation.mutate(
            {
                workOrderId,
                technicianId: selectedTech.id,
                work_hour: parsedHours,
            },
            {
                onSuccess: () => {
                    onAddEmployee?.({
                        name: selectedTech.name,
                        hours: parsedHours || 0,
                    });
                    // reset local state
                    setNameQuery('');
                    setSelectedTech(null);
                    setLocalHours('');
                },
                onError: (err) => {
                    console.error('Assign technician failed', err);
                },
            }
        );
    };

    return (
        <FormSection title="Add Employee">
            <div className="space-y-4">
                {fields.length > 0 && (
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <EmployeeField
                                key={field.id}
                                index={index}
                                register={register}
                                onRemove={onRemoveEmployee}
                            />
                        ))}
                    </div>
                )}

                {/* Search and assign area */}
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <FormInput
                                id="employeeName"
                                label="Technician Name"
                                placeholder="Type name to search"
                                value={nameQuery}
                                onChange={(e) => setNameQuery(e.target.value)}
                            />
                            {findQuery.isFetching && (
                                <p className="text-sm text-gray-500 mt-1">Searching…</p>
                            )}
                            {suggestions.length > 0 && (
                                <div className="mt-2 border rounded divide-y">
                                    {suggestions.map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                                                selectedTech?.id === t.id ? 'bg-gray-100' : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedTech(t);
                                                setNameQuery(t.name);
                                            }}
                                        >
                                            <span className="font-medium">{t.name}</span>
                                            <span className="text-xs text-gray-500"> — ID: {t.id}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="w-40">
                            <FormInput
                                id="hoursWorked"
                                label="Work Hours"
                                type="number"
                                min="0"
                                step="0.1"
                                value={localHours}
                                onChange={(e) => setLocalHours(e.target.value)}
                                className="text-center"
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={handleAssign}
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={assignMutation.isPending}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            {assignMutation.isPending ? 'Assigning…' : 'Add Employee'}
                        </Button>
                    </div>
                </div>

                {fields.length > 0 && (
                    <div className="flex items-center justify-end">
                        <Button
                            type="button"
                            onClick={handleAssign}
                            className="border-dashed border-2 border-gray-300 hover:border-gray-400 py-2 px-4"
                            disabled={assignMutation.isPending}
                        >
                            <Search className="w-4 h-4 mr-2" />
                            {assignMutation.isPending ? 'Assigning…' : 'Add Another Employee'}
                        </Button>
                    </div>
                )}
            </div>
        </FormSection>
    );
};

export default EmployeeSection;
