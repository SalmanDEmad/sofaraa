import { FormEventHandler, useState } from 'react';
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

    const [showModal, setShowModal] = useState(true);
    const [onboardingStep, setOnboardingStep] = useState(1);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const nextStep = () => {
        if (onboardingStep === 4) {
            setShowModal(false);
        } else {
            setOnboardingStep(prev => prev + 1);
        }
    };

    return (
        <GuestLayout>
            <Head title="التسجيل" />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8">
                    <div className="bg-white rounded-xl p-10 max-w-3xl w-full text-right shadow-lg">
                        <h2 className="text-4xl font-extrabold mb-8">أهلاً وسهلاً في أكاديمية الوعي الدعوي</h2>

                        {onboardingStep === 1 && (
                            <div className="space-y-6 text-lg">
                                <p>نقدم دورات إسلامية تفاعلية مع نخبة من المدربين.</p>
                                <p>طوّر معرفتك الشرعية بأسلوب تعليمي فعال.</p>
                                <p>هدفنا أن نمنحك رحلة علمية ممتعة ونافعة.</p>
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
                                <p>اختر السنة الدراسية والدورة التي ترغب في الالتحاق بها:</p>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <select className="border rounded p-3 w-full md:w-1/2">
                                        <option>اختر السنة الدراسية</option>
                                        <option value="1">السنة الأولى</option>
                                        <option value="2">السنة الثانية</option>
                                        <option value="3">السنة الثالثة</option>
                                        <option value="4">السنة الرابعة</option>
                                    </select>
                                    <select className="border rounded p-3 w-full md:w-1/2">
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
                                <p>من أين سمعت عن المنصة؟</p>
                                <input
                                    type="text"
                                    placeholder="مثلاً: فيسبوك، تويتر، صديق، إعلان"
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
                                <p className="text-2xl font-semibold">مرحبًا بك في المنصة!</p>
                                <p>نتمنى لك تجربة تعليمية موفقة وممتعة بإذن الله.</p>
                                <PrimaryButton
                                    onClick={() => setShowModal(false)}
                                    className="mt-8 bg-brown text-white px-8 py-4 rounded-lg hover:bg-brown-dark"
                                >
                                    ابدأ التسجيل
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!showModal && (
                <form onSubmit={submit} className="max-w-md mx-auto">
                    <div>
                        <InputLabel htmlFor="userType" value="نوع المستخدم" />
                        <SelectInput
                            id="userType"
                            name="userType"
                            value={data.userType}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('userType', e.target.value as UserType)}
                            required
                        >
                            <option value="student">طالب</option>
                            <option value="tutor">معلم</option>
                        </SelectInput>
                        <InputError message={errors.userType} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="الاسم الكامل" />
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

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="البريد الإلكتروني" />
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

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="password" value="كلمة المرور" />
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
                            <InputLabel htmlFor="password_confirmation" value="تأكيد كلمة المرور" />
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

                    <div className="mt-4">
                        <InputLabel htmlFor="date_of_birth" value="تاريخ الميلاد" />
                        <TextInput
                            id="date_of_birth"
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            required
                        />
                        <InputError message={errors.date_of_birth} className="mt-2" />
                    </div>

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
                                أوافق على <a href="/terms" className="underline">الشروط والأحكام</a>
                            </span>
                        </label>
                        <InputError message={errors.terms} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <PrimaryButton className="w-full" disabled={processing}>
                            تسجيل
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <div className="w-full border-t opacity-40 border-gray-300"></div>
                        <span className="mx-3 text-gray-500 dark:text-gray-400">أو</span>
                        <div className="w-full border-t opacity-40 border-gray-300"></div>
                    </div>

                    <div className="mt-4 text-center">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                            هل لديك حساب بالفعل؟ تسجيل الدخول
                        </Link>
                    </div>
                </form>
            )}
        </GuestLayout>
    );
}