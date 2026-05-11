import { ButtonHTMLAttributes } from "react";
import * as CSS from "csstype";

type ModalProps = {
    variant?: "text" | "contained" | "outlined" | "gradient" | "auth_signup" | "filled" | "outlined" | "auth" | "Selection" | "Force" | "auth" | "transactions" | "address" | 'responsiveWelcome' | "noticons" | "Charg" | "address";
    className?: React.CSSProperties | any;
    children?: React.ReactNode;
    bgcolor?: string,
    width?: CSS.Property.Width | number;
    height?: CSS.Property.Height | number;
    fullwidth?: boolean | string,
    fullheight?: boolean | string,
    showModal?: boolean;
    color?: boolean | string,
    error?: boolean | string,
    auth?: boolean | string,
    gradient?: boolean | string | any
    endpoint?: string;
    onClose: boolean | string | any,
    logos?: any,
    Close_Icon?: any,
    isVisible?: any,
    animate?: any
    animateResponsive?: any,
};

export default ModalProps;