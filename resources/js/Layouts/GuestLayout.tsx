import ApplicationLogo from '@/Components/ApplicationLogo';
import { PropsWithChildren } from 'react';
import Card from '../Components/Card';
import Base from './BaseLayout';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <Base>
      <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-[#fdf7ee] dark:bg-[#1e1a17]">
        <div>
          <ApplicationLogo className="w-24 h-auto" />
        </div>

        <Card className="w-full sm:max-w-lg mt-6 bg-[#f6eddc] border border-[#e6dcc6] shadow rounded-xl text-[#402a13]">
          {children}
        </Card>
      </div>
    </Base>
  );
}