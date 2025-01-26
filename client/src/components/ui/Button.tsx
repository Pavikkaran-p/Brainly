import { ReactElement } from "react";

interface ButtonProps {
    text: string;
    size: "lg" | "sm" | "md";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    variant: "primary" | "secondary";
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

export function Button({text,size,startIcon,endIcon,variant}: ButtonProps) {
    // const Comp = props.startIcon;
    return <button className={sizeStyles[size] + " " + variantStyles[variant] + defaultStyles}>
        <div className="flex items-center">
             {startIcon?startIcon:null}
            <div className="pl-2 pr-2">
                {text}
            </div>
            {endIcon? endIcon:null}
        </div>
    </button>
}