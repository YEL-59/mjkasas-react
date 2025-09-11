import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const FormTextarea = ({
    id,
    label,
    register,
    placeholder,
    rows = 4,
    className = "",
    labelClassName = "",
    required = false,
    ...props
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className={labelClassName}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
                id={id}
                placeholder={placeholder}
                rows={rows}
                className={className}
                {...register}
                {...props}
            />
        </div>
    );
};

export default FormTextarea;
