import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main CSS
import 'react-date-range/dist/theme/default.css'; // Theme CSS
import { format } from 'date-fns';

interface DateRangePickerProps {
    onChange: (range: { startDate: Date; endDate: Date }) => void;
    ranges: { startDate: Date; endDate: Date; key: string };
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, ranges }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleChange = (ranges: any) => {
        const { selection } = ranges;
        if (selection.startDate != selection.endDate) {
            setIsOpen(false);
        }
        onChange({ startDate: selection.startDate, endDate: selection.endDate });
    };

    // Close picker when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={pickerRef}>
            <div
                className="border text-sm border-gray-300 rounded-md px-4 py-2 cursor-pointer flex items-center justify-between bg-white w-full lg:w-72"
                onClick={handleToggle}
            >
                <span>
                    {`${format(ranges.startDate, 'MMM dd, yyyy')} - ${format(
                        ranges.endDate,
                        'MMM dd, yyyy'
                    )}`}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-50 mt-2 bg-white shadow-lg border rounded-lg">
                    <DateRange
                        ranges={[ranges]}
                        onChange={handleChange}
                        moveRangeOnFirstSelection={false}
                        editableDateInputs
                        rangeColors={['#3b82f6']}
                    />
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
