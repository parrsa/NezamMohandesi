// app/fonts/YekanBakh.ts
import localFont from "next/font/local";
export const YekanBakh = localFont({
    src: [
        {
            path: "../../public/fonts/yekan/YekanBakh-Hairline.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Thin.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Heavy.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/yekan/YekanBakh-Fat.ttf",
            weight: "900",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-yekanbakh",
});
