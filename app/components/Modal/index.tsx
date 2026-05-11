"use client";

import { useEffect } from "react";
import ModalHeader from "../ModalHeader";
import ModalProps from "./type";

interface AdvancedModalProps extends ModalProps {
  showHeader?: boolean;
  headerProps?: any;
}

const Modal = ({
  auth,
  className = "",
  width,
  height,
  variant,
  onClose,
  isVisible,
  logos,
  Close_Icon,
  children,
  showHeader = true,
  headerProps = {},
}: AdvancedModalProps) => {

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        transition-opacity duration-300 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col
          transform transition-all duration-300 ease-out
          animate-fadeInUp
          ${className}
          max-h-[90vh]
        `}
        style={{
          width: width || "w-full",
          height: height || "auto",
          maxWidth: "95%",
        }}
      >
        {showHeader && (
          <ModalHeader
            variant={variant}
            onClose={onClose}
            logos={logos}
            Close_Icon={Close_Icon}
            {...headerProps}
          />
        )}
        <div className="flex-1 w-full overflow-y-auto pt-4   pb-4 ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
