import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function SelectRole({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        role: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('select-role'));
    };

    return (
        <GuestLayout>
            <Head title="Select Role" />


            <form onSubmit={submit} className="h-full w-full">
                <h1 className="text-4xl	text-gray-600 dark:text-gray-400">What describes you better?</h1>
                <div className="flex h-full w-full bg-black">
                </div>

                <div className="flex h-full w-full bg-black">

                </div>
            </form>
        </GuestLayout>
    );
}
