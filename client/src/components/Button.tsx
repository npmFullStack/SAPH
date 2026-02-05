import { ReactNode, ElementType } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    icon?: React.ComponentType<{ size?: number; className?: string }>;
    iconPosition?: "left" | "right";
    children: ReactNode;
    fullWidth?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    as?: ElementType;
    to?: string;
    loading?: boolean;
}

const Button = ({
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "right",
    children,
    fullWidth = false,
    className = "",
    onClick,
    disabled = false,
    type = "button",
    as: Component = "button",
    to,
    loading = false,
    ...props
}: ButtonProps) => {
    // Base styles with modern 3D-like shadow effect
    const baseStyles =
        "relative font-semibold transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2.5 rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed border active:translate-y-[2px] active:shadow-sm";

    // Variant styles with enhanced 3D-like shadows
    const variantStyles = {
        primary:
            "bg-gradient-to-br from-primary to-primary/90 text-white border-primary shadow-[0_6px_0_0_#0059cc] hover:shadow-[0_8px_0_0_#0059cc] active:shadow-[0_2px_0_0_#0059cc] hover:translate-y-[-2px]",
        secondary:
            "bg-gradient-to-br from-secondary to-secondary/90 text-white border-secondary shadow-[0_6px_0_0_#0d244d] hover:shadow-[0_8px_0_0_#0d244d] active:shadow-[0_2px_0_0_#0d244d] hover:translate-y-[-2px]",
        outline:
            "bg-white text-primary border-primary/60 hover:bg-primary/5 hover:border-primary active:bg-primary/10 shadow-[0_6px_0_0_#e5e7eb] hover:shadow-[0_8px_0_0_#d1d5db] active:shadow-[0_2px_0_0_#e5e7eb] hover:translate-y-[-2px]"
    };

    // Size styles - adjusted for better height
    const sizeStyles = {
        sm: "px-5 py-2.5 text-sm font-medium h-10",
        md: "px-7 py-3.5 text-base font-semibold h-12",
        lg: "px-9 py-4.5 text-lg font-bold h-14"
    };

    // Icon size based on button size
    const iconSizes = {
        sm: 16,
        md: 18,
        lg: 20
    };

    // Loading spinner size based on button size
    const loaderSizes = {
        sm: 14,
        md: 16,
        lg: 18
    };

    // Combine disabled and loading states
    const isDisabled = disabled || loading;

    // Button content render function
    const renderContent = () => (
        <>
            {/* Button inner content with subtle highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
            {/* Loading state */}
            {loading && (
                <Loader2 
                    size={loaderSizes[size]}
                    className="relative z-10 animate-spin"
                />
            )}
            
            {/* Content when not loading */}
            {!loading && (
                <>
                    {Icon && iconPosition === "left" && (
                        <Icon
                            size={iconSizes[size]}
                            className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                        />
                    )}
                    <span className="relative z-10">{children}</span>
                    {Icon && iconPosition === "right" && (
                        <Icon
                            size={iconSizes[size]}
                            className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                        />
                    )}
                </>
            )}
        </>
    );

    // Handle React Router Link
    if (Component === Link && to) {
        return (
            <Component
                to={to}
                onClick={isDisabled ? undefined : onClick}
                className={`
                    ${baseStyles}
                    ${variantStyles[variant]}
                    ${sizeStyles[size]}
                    ${fullWidth ? "w-full" : ""}
                    ${isDisabled ? "pointer-events-none opacity-50" : ""}
                    ${className}
                `}
                {...props}
            >
                {renderContent()}
            </Component>
        );
    }

    // Regular button
    return (
        <Component
            type={type}
            onClick={isDisabled ? undefined : onClick}
            disabled={isDisabled}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            {...props}
        >
            {renderContent()}
        </Component>
    );
};

export default Button;