import MonProfile from '@/Components/MonProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BaseLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mon Profile" />

            <MonProfile></MonProfile>
            
        </AuthenticatedLayout>
    );
}
