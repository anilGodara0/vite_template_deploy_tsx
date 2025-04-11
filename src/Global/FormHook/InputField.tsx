/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:35:20
 * @modify date 2024-10-25 11:35:20
 * @desc File to Handle the Different Input Fields
 */

// components/InputField.tsx
import React, { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: Record<string, FieldError | undefined>;
  type?: 'text' | 'password' | 'email' | 'mobile' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  [x: string]: any;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, showLabel = true, name, disabled = false, register, errors, type = 'text', options, ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const renderInputField = () => {
      switch (type) {
        case 'password':
          return (
            <div className="relative">
              <input
                id={name}
                disabled={disabled}
                name={name}
                className='w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600'
                type={isPasswordVisible ? 'text' : 'password'}
                ref={ref}
                {...register(name)}
                {...rest}
              />
              <p
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {isPasswordVisible ? (
                  <RiEyeLine className="text-gray-400 cursor-pointer" />
                ) : (
                  <RiEyeCloseLine className="text-gray-400 cursor-pointer" />
                )}
              </p>
            </div>
          );

        case 'email':
          return (
            <div className="relative">
              <input
                id={name}
                disabled={disabled}
                name={name}
                className='w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600'
                type='email'
                ref={ref}
                {...register(name)}
                {...rest}
              />
              <p
                className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                <HiOutlineMail className="text-gray-400 cursor-pointer" />
              </p>
            </div>
          );



        case 'select':
          return (
            <select
              id={name}
              name={name}
              disabled={disabled}
              className='w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600'
              ref={ref}
              {...register(name)}
              {...rest}
            >
              {options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        case 'checkbox':
          return (
            <div className="flex items-center">
              <input
                id={name}
                name={name}
                disabled={disabled}
                type="checkbox"
                ref={ref}
                {...register(name)}
                {...rest}
                className='mr-2'
              />
              <label className='text-gray-800 text-sm' htmlFor={name}>{label}</label>
            </div>
          );

        default:
          return (
            <input
              id={name}
              disabled={disabled}
              name={name}
              className='w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600'
              type='text'
              ref={ref}
              {...register(name)}
              {...rest}
            />
          );
      }
    };

    return (
      <div className='w-full'>
        {showLabel && (
          <label className='text-gray-800 text-sm mb-2 block' htmlFor={name}>{label}</label>
        )}
        {renderInputField()}
        {errors[name] && <p className='text-red-400 ml-1 mt-1'>{errors[name]?.message}</p>}
      </div>
    );
  }
);

// Forward ref to allow react-hook-form to access the input
InputField.displayName = 'InputField';

export default InputField;
