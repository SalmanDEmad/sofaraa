import { FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaGoogle, FaTwitter, FaDiscord } from 'react-icons/fa';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                </div>

                <div className="mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                {/* "OR" Section with dashed line */}
                <div className="flex items-center justify-center mt-6">
                    <div className="w-full border-t opacity-35 border-gray-300"></div>
                    <span className="mx-3 text-gray-500 dark:text-gray-400">OR</span>
                    <div className="w-full border-t opacity-35 border-gray-300"></div>
                </div>

                {/* Third-party login options */}
                <div className="mt-6">
                    <div className="flex justify-center items-center space-x-6">
                        <FaGoogle
                            className="w-8 h-8 text-red-500 cursor-pointer hover:opacity-80 transition"
                            onClick={() => window.location.href = '/auth/google'} // Placeholder URL
                        />

                        <FaTwitter
                            className="w-8 h-8 text-blue-500 cursor-pointer hover:opacity-80 transition"
                            onClick={() => window.location.href = '/auth/twitter'} // Placeholder URL
                        />

                        <FaDiscord
                            className="w-8 h-8 text-indigo-500 cursor-pointer hover:opacity-80 transition"
                            onClick={() => window.location.href = '/auth/discord'} // Placeholder URL
                        />
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    By continuing, you agree to our <Link href="/terms" className="underline">User Agreement</Link> and acknowledge that you have read and understood our <Link href="/privacy" className="underline">Privacy Policy</Link>.
                </div>

                {/* If not registered */}
                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="underline text-sm text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-400"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <p className="text-white">Or</p>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Sign up for an account
                    </Link>

                </div>
            </form>
        </GuestLayout>
    );
}
