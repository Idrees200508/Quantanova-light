
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "py-4 px-10 rounded-xl font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center text-sm md:text-base border-2";
  
  const variants = {
    primary: "bg-brand-red border-brand-red text-white hover:opacity-90 shadow-lg active:scale-95 shadow-brand-red/20",
    secondary: "bg-transparent border-brand-indigo/30 text-brand-indigo hover:bg-brand-indigo/5 active:scale-95",
    outline: "bg-transparent border-brand-red text-brand-red hover:bg-brand-red/5 active:scale-95",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
