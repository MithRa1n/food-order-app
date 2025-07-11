import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textOnly?: boolean;
    className?: string
}   


export const Button: React.FC<ButtonProps> = ({children, textOnly = false, className = "", ...props}) => {
    let cssClass = textOnly ? `text-button` : 'button';
    cssClass += ' ' + className;
    return (<button  className={cssClass} {...props}>{children}</button>)
}