"use client";
import * as React from "react";
import { cn } from "@/app/lib/utils";

type InputVariant =
    "form"
    | "default"
    | "outline"
    | "filled"
    | "floating"
    | "minimal"
    | "glass"
    | "modern"
    | "rounded";

type InputSize = "sm" | "md" | "lg" | "xl";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    inputSize?: InputSize;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    fullWidth?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
    focusRing?: boolean;
    transition?: boolean;
}

const variantClasses: Record<InputVariant, string> = {
    default: "bg-white border border-gray-300 text-gray-900",
    outline: "bg-transparent border-2 border-gray-300 text-gray-900",
    filled: "bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100",
    floating: "bg-white border border-gray-300 text-gray-900 peer",
    minimal: "bg-transparent border-b-2 border-gray-300 text-gray-900 rounded-none",
    glass: "bg-white/20 backdrop-blur-sm border border-white/30 text-gray-900",
    modern: "bg-white border-l-4 border-blue-500 text-gray-900",
    rounded: "bg-white border border-gray-300 text-gray-900 rounded-full",
    form: "w-full px-4 py-3 rounded-xl border border-gray-300  transition-all "
};

const sizeClasses: Record<InputSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-4 text-lg",
    xl: "h-14 px-5 text-xl",
};

const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
};

const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    inner: "shadow-inner",
};

export function Input({
    className,
    type = "text",
    variant = "default",
    inputSize = "md",
    error = false,
    success = false,
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    label,
    helperText,
    errorMessage,
    fullWidth = true,
    rounded = "md",
    shadow = "none",
    focusRing = true,
    transition = true,
    id,
    ...rest
}: InputProps) {
    const inputId = id || React.useId();

    const baseClasses = cn(
        "flex items-center min-w-0 outline-none",
        variantClasses[variant],
        sizeClasses[inputSize],
        roundedClasses[rounded],
        shadowClasses[shadow],
        focusRing && "",
        transition && "",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        success && "border-green-500 focus:border-green-500 focus:ring-green-500",
        disabled && "opacity-50 cursor-not-allowed bg-gray-100",
        fullWidth && "w-full",
        loading && "animate-pulse bg-gray-200",
        className
    );

    const floatingLabelClasses = cn(
        "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-1",
        "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:bg-transparent",
        "peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:bg-white",
        error ? "text-red-600 peer-focus:text-red-600" : "text-gray-500 peer-focus:text-blue-600"
    );

    const renderInput = () => (
        <div className={cn("relative", fullWidth && "w-full")}>
            {variant === "floating" && label && (
                <label
                    htmlFor={inputId}
                    className={floatingLabelClasses}
                >
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
                        {leftIcon}
                    </div>
                )}

                <input
                    id={inputId}
                    type={type}
                    className={cn(
                        baseClasses,
                        leftIcon && "pl-10",
                        rightIcon && "pr-10",
                        variant === "floating" && label && "pt-6 pb-2",
                        variant === "minimal" && "px-0"
                    )}
                    disabled={disabled || loading}
                    placeholder={variant === "floating" ? " " : rest.placeholder}
                    {...rest}
                />

                {rightIcon && (
                    <div className="absolute right-3 flex items-center pointer-events-none text-gray-400">
                        {rightIcon}
                    </div>
                )}

                {loading && (
                    <div className="absolute right-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
            {variant !== "floating" && label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "text-sm font-medium mb-1",
                        error ? "text-red-600" : "text-gray-700"
                    )}
                >
                    {label}
                </label>
            )}

            {renderInput()}

            {(helperText || errorMessage) && (
                <p
                    className={cn(
                        "text-xs mt-1",
                        error ? "text-red-600" : "text-gray-500"
                    )}
                >
                    {error ? errorMessage : helperText}
                </p>
            )}

            {rest.maxLength && (
                <div className="flex justify-end text-xs text-gray-400 mt-1">
                    {rest.value?.toString().length || 0} / {rest.maxLength}
                </div>
            )}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: InputVariant;
    inputSize?: InputSize;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    fullWidth?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
    focusRing?: boolean;
    transition?: boolean;
    rows?: number;
    resizable?: boolean;
}

export function TextArea({
    className,
    variant = "default",
    inputSize = "md",
    error = false,
    success = false,
    disabled = false,
    loading = false,
    label,
    helperText,
    errorMessage,
    fullWidth = true,
    rounded = "md",
    shadow = "none",
    focusRing = true,
    transition = true,
    rows = 3,
    resizable = true,
    id,
    ...rest
}: TextAreaProps) {
    const textareaId = id || React.useId();

    const baseClasses = cn(
        "min-w-0 outline-none px-4 py-3",
        variantClasses[variant],
        inputSize === "sm" && "text-sm",
        inputSize === "md" && "text-base",
        inputSize === "lg" && "text-lg",
        inputSize === "xl" && "text-xl",
        roundedClasses[rounded],
        shadowClasses[shadow],
        focusRing && "",
        transition && "",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        success && "border-green-500 focus:border-green-500 focus:ring-green-500",
        disabled && "opacity-50  bg-gray-100",
        fullWidth && "w-full",
        loading && "animate-pulse bg-gray-200",
        !resizable && "resize-none",
        className
    );

    return (
        <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
            {label && (
                <label
                    htmlFor={textareaId}
                    className={cn(
                        "text-sm font-medium mb-1",
                        error ? "text-red-600" : "text-gray-700"
                    )}
                >
                    {label}
                </label>
            )}

            <textarea
                id={textareaId}
                className={baseClasses}
                rows={rows}
                disabled={disabled || loading}
                {...rest}
            />

            {(helperText || errorMessage) && (
                <p
                    className={cn(
                        "text-xs mt-1",
                        error ? "text-red-600" : "text-gray-500"
                    )}
                >
                    {error ? errorMessage : helperText}
                </p>
            )}

            {rest.maxLength && (
                <div className="flex justify-end text-xs text-gray-400 mt-1">
                    {rest.value?.toString().length || 0} / {rest.maxLength}
                </div>
            )}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    variant?: InputVariant;
    inputSize?: InputSize;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    fullWidth?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner";
    focusRing?: boolean;
    transition?: boolean;
    options?: Array<{ value: string; label: string }>;
}

export function Select({
    className,
    variant = "default",
    inputSize = "md",
    error = false,
    success = false,
    disabled = false,
    loading = false,
    label,
    helperText,
    errorMessage,
    fullWidth = true,
    rounded = "md",
    shadow = "none",
    focusRing = true,
    transition = true,
    children,
    options,
    id,
    ...rest
}: SelectProps) {
    const selectId = id || React.useId();

    const baseClasses = cn(
        "flex items-center min-w-0 outline-none px-4 appearance-none bg-no-repeat bg-right",
        "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3E%3C/svg%3E')]",
        "pr-10",
        variantClasses[variant],
        sizeClasses[inputSize],
        roundedClasses[rounded],
        shadowClasses[shadow],
        focusRing && "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        transition && "",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        success && "border-green-500 focus:border-green-500 focus:ring-green-500",
        disabled && "opacity-50 cursor-not-allowed bg-gray-100",
        fullWidth && "w-full",
        loading && "animate-pulse bg-gray-200",
        className
    );

    return (
        <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        "text-sm font-medium mb-1",
                        error ? "text-red-600" : "text-gray-700"
                    )}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    id={selectId}
                    className={baseClasses}
                    disabled={disabled || loading}
                    {...rest}
                >
                    {options
                        ? options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                        : children}
                </select>
            </div>

            {(helperText || errorMessage) && (
                <p
                    className={cn(
                        "text-xs mt-1",
                        error ? "text-red-600" : "text-gray-500"
                    )}
                >
                    {error ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
}




// // uasage
// <Input
//   placeholder="نام خود را وارد کنید"
//   variant="default"
//   size="md"
// />

// <Input
//   placeholder="جستجو..."
//   leftIcon={<Search size={16} />}
//   rightIcon={<Filter size={16} />}
//   variant="outline"
// />

// <Input
//   label="ایمیل"
//   type="email"
//   variant="floating"
// />

// <Input
//   label="رمز عبور"
//   type="password"
//   error={true}
//   errorMessage="رمز عبور باید حداقل ۸ کاراکتر باشد"
// />

// <Input
//   placeholder="عنوان مطلب"
//   variant="modern"
//   size="lg"
// />

// <TextArea
//   label="توضیحات"
//   placeholder="توضیحات را اینجا بنویسید..."
//   rows={4}
//   variant="filled"
// />

// <Select
//   label="دسته‌بندی"
//   options={[
//     { value: "1", label: "تکنولوژی" },
//     { value: "2", label: "هنر" },
//     { value: "3", label: "ورزش" }
//   ]}
//   variant="outline"
// />

// <Input
//   placeholder="نام کاربری"
//   variant="glass"
//   className="text-white placeholder:text-white/70"
// />