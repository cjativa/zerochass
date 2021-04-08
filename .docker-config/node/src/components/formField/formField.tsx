import React, { ReactNode } from 'react';

interface IFormFieldProps {
    labelText: string,
    children: ReactNode,

    className?: string,
};

export const FormField = ({ className, labelText, children }: IFormFieldProps) => {

    let classString = 'form-field';

    if (className) {
        classString += ` ${className}`;
    }

    return (
        <div className={classString}>
            <label className="form-field__label">
                {labelText}
            </label>

            <div className="form-field__input">
                {children}
            </div>
        </div>
    );
}