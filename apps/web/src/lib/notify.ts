import { toast } from 'react-toastify';

export const notify = (messsage: string) => {
  toast.error(messsage, {
    autoClose: 500,
    closeButton: false,
    position: 'bottom-right',
    theme: 'dark',
    closeOnClick: true,
    draggable: true,
    draggableDirection: 'y',
    className: 'rounded-xl p-5 bg-black/90',
    ariaLabel: 'Notification',
  });
};
