import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardLayout from '@/Layouts/StudentLayout';
import { PageProps } from '@/types/index';
import { Head, useRemember } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
    return (
      <DashboardLayout activeLink='#profile' {...{ isCollapsed: isSidebarCollapsed, toggleSidebar}}>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12 lg:mx-32">
                <div className=" mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white bg-[#fdf7ee]">
                        <UpdateProfileInformationForm
                          mustVerifyEmail={mustVerifyEmail}
                          status={status}

                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white bg-[#fdf7ee]">
                        <UpdatePasswordForm />
                    </div>

                    <div className="p-4 sm:p-8 bg-white bg-[#fdf7ee]">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
      </DashboardLayout>
    );
}
