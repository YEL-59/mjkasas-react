import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import FormSection from './FormSection';
import FormInput from './FormInput';
import EmployeeField from './EmployeeField';

const EmployeeSection = ({
    fields,
    register,
    onAddEmployee,
    onRemoveEmployee
}) => {
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

                {fields.length === 0 && (
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <FormInput
                                    id="employeeName"
                                    label="Employee Name"
                                    register={register('employeeName')}
                                    placeholder="Enter employee name"
                                />
                            </div>
                            <div className="w-32">
                                <FormInput
                                    id="hoursWorked"
                                    label="Hours Worked"
                                    type="number"
                                    register={register('hoursWorked', { valueAsNumber: true })}
                                    className="text-center"
                                    min="0"
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={onAddEmployee}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Employee
                            </Button>
                        </div>
                    </div>
                )}

                {fields.length > 0 && (
                    <Button
                        type="button"
                        onClick={onAddEmployee}
                        className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 py-4"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Another Employee
                    </Button>
                )}
            </div>
        </FormSection>
    );
};

export default EmployeeSection;
