import React, { ChangeEvent } from 'react';
import { Input as ShardInput } from "shards-react";

interface IInputProps {
    type: 'text' | 'email' | 'password' | 'phoneNumber',
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,

    className?: string,
    valid?: boolean,
    invalid?: boolean,
    invalidText?: string,
    placeholder?: string,
};

export const Input = ({ className, type, onChange, valid, invalid, invalidText, placeholder }: IInputProps) => {

    let inputClassString = `input`;

    if (className) {
        inputClassString += ` ${className}`;
    }

    return (
        <div className={inputClassString}>
            <ShardInput
                className={inputClassString}
                type={type}
                valid={valid}
                invalid={invalid}
                placeholder={placeholder}
                onChange={onChange}
            />

            {/** Display error text if it has been provided */}
            {invalid && invalidText &&
                <span>
                    {invalidText}
                </span>
            }
        </div>
    );
};