import { FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaGoogle, FaTwitter, FaDiscord } from 'react-icons/fa';

type UserType = "student" | "tutor";

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    date_of_birth: string;
    userType: UserType;
    terms: boolean;
}

export default function Register() {

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        date_of_birth: '',
        userType: 'student',
        terms: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* User Type (Student/Tutor) */}
                <div>
                    <InputLabel htmlFor="userType" value="Register as" />
                    <SelectInput
                        id="userType"
                        name="userType"
                        value={data.userType}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('userType', e.target.value as UserType)}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                    </SelectInput>
                    <InputError message={errors.userType} className="mt-2" />
                </div>

                {/* Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password and Confirm Password in a single row */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="mt-4">
                    <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                    <TextInput
                        id="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        autoComplete="bday-day"
                        value={data.date_of_birth}
                        className="mt-1 block w-full text:white"
                        onChange={(e) => setData('date_of_birth', e.target.value)}
                        required
                    />
                    <InputError message={errors.date_of_birth} className="mt-2" />
                </div>

                {/* Terms and Conditions */}
                <div className="mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            required
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            I agree to the <a href="/terms" className="underline">terms and conditions</a>
                        </span>
                    </label>
                    <InputError message={errors.terms} className="mt-2" />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>

                {/* "OR" Section with dashed line */}
                <div className="flex items-center justify-center mt-6">
                    <div className="w-full border-t opacity-40 border-gray-300"></div>
                    <span className="mx-3 text-gray-500 dark:text-gray-400">OR</span>
                    <div className="w-full border-t opacity-40 border-gray-300"></div>
                </div>

                {/* Third-party registration options */}
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

                {/* Login Link */}
                <div className="mt-4 text-center">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                        Already registered?
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
