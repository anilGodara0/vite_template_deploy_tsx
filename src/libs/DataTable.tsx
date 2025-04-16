import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useInfiniteScroll } from './useInfiniteScroll';
import { FaTableCells } from 'react-icons/fa6';
import { GoSync } from 'react-icons/go';

interface Column {
    label: string;
    key: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    data: any[];
    columns: Column[];
    defaultVisible?: string[];
    onRowClick?: (row: any) => void;
    loadMore?: () => void;
    hasMore?: boolean;
    isLoading?:boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    defaultVisible = [],
    onRowClick,
    loadMore,
    hasMore = false,
    isLoading=false,
}) => {
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        defaultVisible.length ? defaultVisible : columns.map((col) => col.key)
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleColumn = (key: string) => {
        setVisibleColumns((prev) =>
            prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
        );
    };

    const handleSelectAll = () => setVisibleColumns(columns.map(col => col.key));
    const handleClearAll = () => setVisibleColumns([]);

    const filteredColumns = columns.filter((col) =>
        col.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sentinelRef = useInfiniteScroll(() => loadMore?.(), hasMore);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="p-4 border rounded-2xl shadow bg-white relative space-y-4">
            {/* Column Toggle Dropdown */}
            <div className="relative flex justify-end" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium border border-gray-300 rounded-md transition"
                >
                    <FaTableCells/>
                    <FiChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-72 bg-white border rounded-lg shadow-xl p-4 space-y-3">
                        <input
                            type="text"
                            placeholder="Search columns..."
                            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="flex justify-end text-xs">
                            <button onClick={handleClearAll} className="btn mr-2  bg-gray-300 text-white border-0">
                                Clear All
                            </button>
                            <button onClick={handleSelectAll} className="btn bg-primary text-white border-0">
                                Select All
                            </button>
                            
                        </div>

                        <div className="max-h-56 overflow-y-auto space-y-2">
                            {filteredColumns.map((col) => (
                                <label key={col.key} className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.includes(col.key)}
                                        onChange={() => toggleColumn(col.key)}
                                        className="accent-blue-500"
                                    />
                                    {col.label}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-200 text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns
                                .filter((col) => visibleColumns.includes(col.key))
                                .map((col) => (
                                    <th
                                        key={col.key}
                                        className="p-3 border-b text-left font-semibold text-gray-700"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns
                                    .filter((col) => visibleColumns.includes(col.key))
                                    .map((col) => (
                                        <td key={col.key} className="p-3 border-t">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                        {hasMore && (
                            <tr>
                                <td colSpan={visibleColumns.length}>
                                    <div
                                        ref={sentinelRef}
                                        className="h-10 w-full text-center text-gray-400"
                                    >
                                        Loading more...
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {isLoading&&!data?.length?<div className='text-center p-4'><p className='flex text-center'><GoSync className='animate-spin flex-end text-black'/><span className='ml-2 mt-[-3px]'> Loading data...</span> </p></div>:null}
            </div>
        </div>
    );
};
