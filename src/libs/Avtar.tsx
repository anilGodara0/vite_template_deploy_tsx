import React from "react";

interface AvatarProps {
    name: string;
}

const colors = [
    "bg-red-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-cyan-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-orange-300",
];

const generateAvatar = (name: string): string => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const getColorClass = (initials: string): string => {
    const charCodeSum = initials
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length]; // Map sum to a color
};

const Avatar: React.FC<AvatarProps> = ({ name }) => {
    const initials = generateAvatar(name);
    const colorClass = getColorClass(initials);

    return (
        <div
            className={`h-10 w-10 lg:h-16 lg:w-16 flex items-center justify-center rounded-full ${colorClass} text-white text-lg font-bold`}
        >
            {initials}
        </div>
    );
};

export default Avatar;
