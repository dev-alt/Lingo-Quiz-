"use client"    
import { createContext, useContext } from 'react';
import { toast, ToastOptions } from "react-toastify";

interface ToastContextType {
  showToast: (message: string, type: "success" | "error", options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const showToast = (message: string, type: "success" | "error", options?: ToastOptions) => {
    toast[type](message, options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};