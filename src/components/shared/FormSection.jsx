import React from 'react';

const FormSection = ({
    title,
    children,
    className = "bg-white p-6 rounded-lg shadow-sm border"
}) => {
    return (
        <div className={className}>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
            {children}
        </div>
    );
};

export default FormSection;
