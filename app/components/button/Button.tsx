import React from "react";
import { cn } from "@/app/lib/utils";
import { ButtonProps, Variant, Size } from "./button.types";

export const Button: React.FC<ButtonProps> = ({
    variant = "default",
    size = "default",
    className,
    children,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring";

    const variants: Record<Variant, string> = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
            "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes: Record<Size, string> = {
        sm: "h-8 px-3 text-sm",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-6 text-base",
        icon: "size-9 rounded-md",
    };

    return (
        <button
            className={cn(base, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};
