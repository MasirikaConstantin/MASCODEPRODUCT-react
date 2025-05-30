import ApplicationLogo from '@/Components/ApplicationLogo';
import Header from '@/Components/Headers/Header';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <>
        <Header/>
        <div className="flex flex-col items-center  pt-6 sm:justify-center sm:pt-0">
           
            <h1 className='mt-10'>Se connecter</h1>
            <div className="mt-6 w-full overflow-hidden bg-base-200 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
        </>
    );
}
