import { toast } from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  style?: React.CSSProperties;
}

export const showToast = {
  success: (message: string, options: ToastOptions = {}) => {
    toast.success(message, {
      duration: options.duration || 4000,
      position: options.position || 'top-right',
      style: {
        background: '#4CAF50',
        color: 'white',
        ...options.style
      },
    });
  },
  
  error: (message: string, options: ToastOptions = {}) => {
    toast.error(message, {
      duration: options.duration || 4000,
      position: options.position || 'top-right',
      style: {
        background: '#F44336',
        color: 'white',
        ...options.style
      },
    });
  },
  
  custom: (message: string, options: ToastOptions & { icon?: string } = {}) => {
    toast(message, {
      duration: options.duration || 4000,
      position: options.position || 'top-right',
      icon: options.icon,
      style: {
        background: '#FFA500',
        color: 'white',
        ...options.style
      },
    });
  }
};