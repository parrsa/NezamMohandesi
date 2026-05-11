import { useMemo } from "react";
const useTruncateText = (text: string = "", maxLength: number = 100, suffix: string = "...") => {
    const truncated = useMemo(() => {
        if (!text) return "";
        return text.length > maxLength ? `${text.slice(0, maxLength)}${suffix}` : text;
    }, [text, maxLength, suffix]);
    return truncated;
};

export default useTruncateText;