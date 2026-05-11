"use client";
import * as React from "react";
import { cn } from "@/app/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    width?: string;
    height?: string;
    bgcolor?: string;
    borderradius?: string;
}

export function Textarea({
    className,
    error,
    width,
    height,
    bgcolor,
    borderradius,
    ...rest
}: TextareaProps) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground placeholder:text-[15.5px] placeholder:font-medium selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none  -none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring border-gray-300 focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                error ? "border-red-500 ring-red-200" : "border-gray-300",
                className
            )}
            style={{
                width: width || "100%",
                height: height || "100px",
                backgroundColor: bgcolor || "#fff",
                borderRadius: borderradius || "8px",
            }}
            {...rest}
        />
    );
}
