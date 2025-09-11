import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FormInput = ({
    id,
    label,
    register,
    placeholder,
    type = "text",
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
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                className={className}
                {...register}
                {...props}
            />
        </div>
    );
};

export default FormInput;
