import toast, { Toaster } from 'react-hot-toast';
import { PropsWithChildren, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Base({ children }: PropsWithChildren) {

  const { flash } = usePage().props
  const [hasFlashed, setHasFlashed] = useState(false);

  useEffect(() => {

    if (!hasFlashed) {
      // if (flash?.error) toast.success(flash?.error);
      // else if (flash?.warning) toast.success(flash?.warning);
      // else if (flash?.info) toast.success(flash?.info);
      // else if (flash?.success) toast.success(flash?.success);
      setHasFlashed(true);
    }
  }, [flash, hasFlashed, setHasFlashed]);

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
