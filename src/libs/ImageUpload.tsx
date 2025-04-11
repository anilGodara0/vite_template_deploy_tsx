/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:21:38
 * @modify date 2024-10-25 11:21:38
 * @desc Image Upload Function which will handle the Upload Image Functionality and fast create blob url so user think image upload Too fast 
 */
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { helper } from './HelperPipe';

interface ImageUploadProps {
    label?: string;
    onChange: (file: File | null) => void;
    value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onChange, value }: any) => {
    const [imagePreview, setImagePreview]: any = useState(value || '');
    useEffect(() => {
        setImagePreview(value)
    }, [value])
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImagePreview(fileURL);
            onChange(file);
        } else {
            setImagePreview('');
            onChange(null);
        }
    };

    return (
        <div className="flex flex-col rounded-lg cursor-pointer gap-2 max-sm:mx-auto">
            {label && <label className="text-sm mb-2 block">{label}</label>}
            <span className="flex flex-wrap gap-3">
                <div className="relative ">
                    {imagePreview ? (
                        <img
                            src={helper.ImagePathSettter(imagePreview)}
                            className="bg-white thumbnail !w-[100px] !h-[100px] rounded-lg shadow-lg border-[2px] border-white object-contain"
                            alt="Uploaded preview"
                        />
                    ) : (
                        <div className="bg-gray-200 !w-[100px] !h-[100px] rounded-lg shadow-lg border-[2px] border-white flex items-center justify-center" onClick={() => document.getElementById('dropzone-file')?.click()}>
                            <FiPlus className="text-gray-400" />
                        </div>
                    )}
                    {imagePreview && <IoCloseOutline
                        className="absolute -top-2 -right-2 pointer hover:text-red-600 w-5 h-5 border bg-white shadow-md rounded-[50%]"
                        onClick={() => {
                            setImagePreview('');
                            onChange(null);
                        }}
                    />}
                </div>
            </span>

            <label className="flex hidden items-center justify-center cursor-pointer text-black-800 bg-[#fff] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 border-2 border-dashed border-gray-200 sm:max-w-[200px]" style={{ gap: '8px' }}>
                <FiPlus />
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                />
                Upload Image
            </label>
        </div>
    );
};

export default ImageUpload;
