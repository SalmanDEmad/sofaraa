import { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

export default function Modal({
  children,
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose = () => {},
}: PropsWithChildren<{
  show: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  closeable?: boolean;
  onClose: CallableFunction;
}>) {
  const close = () => {
    if (closeable) onClose();
  };

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth];

  return (
    <Transition show={show} as="div">
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0"
        onClose={close}
      >
        {/* Overlay */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        {/* Modal Content */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel
            className={`relative bg-white rounded-xl shadow-2xl w-full ${maxWidthClass}`}
          >
            <div className="w-full p-6">{children}</div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
