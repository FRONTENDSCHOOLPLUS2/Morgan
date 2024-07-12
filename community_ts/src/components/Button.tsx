import { ReactNode } from "react";

const Button = ({
    children,
    type = 'button',
    bgColor = 'orange',
    size = 'md',
    ...rest
}: IButtonProps) => {
    
    const btnColor:IBtnColor = {
        gray: 'bg-gray-900',
        orange: 'bg-orange-500',
        red: 'bg-red-500',
    };
    const btnSize: IBtnSize = {
        sm: 'py-1 px-2 text-sm',
        md: 'py-1 px-4 text-base',
        lg: 'py-2 px-6 text-lg',
    };

    return(
        <button 
            type={ type }
            className={`${ btnColor[bgColor] } ${ btnSize[size] } text-white font-semibold ml-2 text-base hover:bg-amber-400 rounded`}
            { ...rest }
        >
            { children }
        </button>
    );
}

interface IButtonProps {
    children: ReactNode,
    type?: "button" | "submit" | "reset" | undefined,
    size?: keyof IBtnSize,
    bgColor?: keyof IBtnColor,
    onClick?: () => void;
}

interface IBtnColor {
    gray: string,
    orange: string,
    red: string
}

interface IBtnSize {
    sm: string,
    md: string,
    lg: string,
}

export default Button;