"use client";

import React from "react";
import { XIcon } from "lucide-react";

interface ModalHeaderProps {
    title?: string;
    ColorText?: string,
    logos?: string[];
    Close_Icon?: React.ReactNode;
    onClose?: () => void;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    variant?: string;
    className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
    title,
    logos,
    ColorText,
    Close_Icon,
    onClose,
    leftContent,
    rightContent,
    variant,
    className = "",
}) => {
    return (
        <div
            className={`
        w-full flex items-center justify-between p-4 border-b
        border-gray-200 bg-white
        ${className}
      `}
        >
            <div className="flex items-center gap-2">
                {logos &&
                    logos.map((logo, idx) => (
                        <img
                            key={idx}
                            src={logo}
                            alt={`Logo ${idx}`}
                            className="h-6 w-6 object-contain"
                        />
                    ))}
                {leftContent}
                {title && <h3 className={`text-xl tracking-tight  font-medium text-[${ColorText ? ColorText : "black"}] `} >{title}</h3>}
            </div>

            <div className="flex items-center gap-2">
                {rightContent}
                {Close_Icon ? (
                    <span className="cursor-pointer" onClick={onClose}>
                        {Close_Icon}
                    </span>
                ) : (
                    <XIcon
                        className="w-5 h-5 cursor-pointer"
                        onClick={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default ModalHeader;
