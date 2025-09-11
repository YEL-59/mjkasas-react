import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import FormInput from './FormInput';

const EmployeeField = ({
    index,
    register,
    onRemove
}) => {
    return (
        <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <FormInput
                        id={`employees.${index}.name`}
                        label="Employee Name"
                        register={register(`employees.${index}.name`)}
                        placeholder="Enter employee name"
                    />
                </div>
                <div className="w-32">
                    <FormInput
                        id={`employees.${index}.hours`}
                        label="Hours Worked"
                        type="number"
                        register={register(`employees.${index}.hours`, { valueAsNumber: true })}
                        className="text-center"
                        min="0"
                    />
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onRemove(index)}
                    className="text-red-600 hover:text-red-700"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default EmployeeField;
