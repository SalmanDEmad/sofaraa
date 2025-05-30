import ApplicationLogo from '@/Components/ApplicationLogo';
import { PropsWithChildren } from 'react';
import Card from '../Components/Card';
import Base from './BaseLayout';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <Base>
      <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-white">
        <div>
          <ApplicationLogo className="w-24 h-auto" />
        </div>

        <Card className="w-full sm:max-w-lg mt-6 border border-[#e6dcc6] shadow rounded-xl text-[#402a13]">
          {children}
        </Card>
      </div>
    </Base>
  );
}