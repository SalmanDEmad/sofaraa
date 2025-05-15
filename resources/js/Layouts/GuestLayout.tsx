import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Card from '../Components/Card';
import Base from './BaseLayout';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <Base>
    <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100 dark:bg-[#192032]">
      <div>
        <ApplicationLogo className="w-20 h-20" />
      </div>

      <Card className="w-full sm:max-w-lg mt-6">
        {children}
      </Card>
    </div>
    </Base>
  );
}
