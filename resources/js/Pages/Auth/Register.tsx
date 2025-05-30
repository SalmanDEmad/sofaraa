import { FormEventHandler, useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Head, Link, useForm } from '@inertiajs/react';

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

    // State to control modal visibility
    const [showModal, setShowModal] = useState(true);
    // State for onboarding steps (mock)
    const [onboardingStep, setOnboardingStep] = useState(1);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Handler for next onboarding step or close modal if last step
    const nextStep = () => {
        if (onboardingStep === 3) {
            setShowModal(false);
        } else {
            setOnboardingStep(prev => prev + 1);
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Modal overlay */}
            {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8">
                <div className="bg-white rounded-xl p-10 max-w-3xl w-full text-right shadow-lg">
                <h2 className="text-4xl font-extrabold mb-8">أهلاً وسهلاً في أكاديمية الوعي الدعوي</h2>

                {onboardingStep === 1 && (
                    <div className="space-y-6 text-lg">
                    <p>نحن في أكاديمية الوعي الدعوي نقدم دورات إسلامية مميزة وموثوقة تساعدك على تطوير معرفتك الدينية.</p>
                    <p>تعلّم بأسلوب تفاعلي مع أفضل المدربين.</p>
                    <p>هدفنا تمكينك من الاستفادة القصوى في رحلة التعلم الخاصة بك.</p>
                    <PrimaryButton
                        onClick={nextStep}
                        className="mt-8 bg-brown text-white px-6 py-3 rounded-lg hover:bg-brown-dark"
                    >
                        التالي
                    </PrimaryButton>
                    </div>
                )}

            {onboardingStep === 2 && (
                <div className="space-y-6 text-lg">
                <p>من فضلك اختر السنة الدراسية والدورة التي تود التسجيل بها:</p>
                <div className="flex flex-col md:flex-row gap-6">
                    <select className="border rounded p-3 w-full md:w-1/2" aria-label="السنة الدراسية">
                    <option>اختر السنة الدراسية</option>
                    <option value="1">السنة الأولى</option>
                    <option value="2">السنة الثانية</option>
                    <option value="3">السنة الثالثة</option>
                    <option value="4">السنة الرابعة</option>
                    </select>
                    <select className="border rounded p-3 w-full md:w-1/2" aria-label="الدورة">
                    <option>اختر الدورة</option>
                    <option value="aqeedah">العقيدة</option>
                    <option value="fiqh">الفقه</option>
                    <option value="seerah">السيرة</option>
                    <option value="tafsir">التفسير</option>
                    </select>
                </div>
                <PrimaryButton
                    onClick={nextStep}
                    className="mt-8 bg-brown text-white px-6 py-3 rounded-lg hover:bg-brown-dark"
                >
                    التالي
                </PrimaryButton>
                </div>
            )}

            {onboardingStep === 3 && (
                <div className="space-y-6 text-lg">
                <p>كيف وجدت رابط الموقع؟</p>
                <input
                    type="text"
                    placeholder="مثلاً: فيسبوك، تويتر، صديق، إعلان، آخر"
                    className="border rounded p-3 w-full"
                />
                <PrimaryButton
                    onClick={nextStep}
                    className="mt-8 bg-brown text-white px-6 py-3 rounded-lg hover:bg-brown-dark"
                >
                    التالي
                </PrimaryButton>
                </div>
            )}

            {onboardingStep === 4 && (
                <div className="space-y-6 text-lg text-center">
                <p className="text-2xl font-semibold">مرحبًا بك في منصة أكاديمية الوعي الدعوي!</p>
                <p>نتمنى لك رحلة تعليمية ناجحة ومثمرة.</p>
                <PrimaryButton
                    onClick={() => setShowModal(false)}
                    className="mt-8 bg-brown text-white px-8 py-4 rounded-lg hover:bg-brown-dark"
                >
                    ابدأ التسجيل الآن
                </PrimaryButton>
                </div>
            )}
            </div>
        </div>
        )}


            {/* Registration form only shows if modal is closed */}
            {!showModal && (
                <form onSubmit={submit} className="max-w-md mx-auto">
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

                    {/* Password and Confirm Password */}
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
                            className="mt-1 block w-full text-white"
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

                    {/* "OR" Section */}
                    <div className="flex items-center justify-center mt-6">
                        <div className="w-full border-t opacity-40 border-gray-300"></div>
                        <span className="mx-3 text-gray-500 dark:text-gray-400">OR</span>
                        <div className="w-full border-t opacity-40 border-gray-300"></div>
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
            )}
        </GuestLayout>
    );
}