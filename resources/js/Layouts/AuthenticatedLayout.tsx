import { PropsWithChildren, ReactNode } from 'react';
import Base from './BaseLayout';
import { User } from '../types';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    return (
        <Base>
            <div className="min-h-screen">
                <main>{children}</main>
            </div>
        </Base>
    );
}
