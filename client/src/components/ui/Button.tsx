import { ReactElement } from "react";

interface ButtonProps {
    text: string;
    size: "lg" | "sm" | "md";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    variant: "primary" | "secondary";
    onClick?: () => void;
    fullWidth?: string;
    loading?: string;
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-3 py-2 text-sm rounded-md",
}


const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-400 text-purple-600",
}

const defaultStyles = `font-light mx-2`

export function Button({text,size,startIcon,endIcon,variant,onClick,fullWidth,loading}: ButtonProps) {
    // const Comp = props.startIcon;
    return <button onClick={onClick} className={sizeStyles[size] + " " + variantStyles[variant] + defaultStyles + `${fullWidth ? " w-full flex justify-center":""} ${ loading ? "opacity-70":"" }`}>
        <div className="flex items-center">
             {startIcon?startIcon:null}
            <div className="pl-2 pr-2">
                {text}
            </div>
            {endIcon? endIcon:null}
        </div>
    </button>
}