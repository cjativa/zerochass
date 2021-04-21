import React, { ChangeEvent, KeyboardEvent } from 'react';
import { FormInput as ShardInput } from "shards-react";

interface IInputProps {
    type: 'text' | 'email' | 'password' | 'phoneNumber',
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void,
    className?: string,
    valid?: boolean,
    invalid?: boolean,
    invalidText?: string,
    placeholder?: string,
};

export const Input = ({ value, className, type, onChange, valid, invalid, invalidText, placeholder, onKeyDown }: IInputProps) => {

    let inputClassString = `input`;

    if (className) {
        inputClassString += ` ${className}`;
    }

    return (
        <div
            className={inputClassString
            }>
            <ShardInput
                className={inputClassString}
                type={type}
                valid={valid}
                invalid={invalid}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
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