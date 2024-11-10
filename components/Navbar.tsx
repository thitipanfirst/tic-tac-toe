import React, { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { logOut } from '@/services/auth';
import { useRouter } from 'next/router';

const Navbar = () => {
    const user = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token === null || token === 'undefined' || /^\s*$/.test(token)) {
            router.push(`/`)
        } else {
            router.push(`/home`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='flex bg-black w-full h-20 justify-end py-4 px-6 gap-4'>
            {user && (
                <>
                    <h1 className='text-white my-auto'>Welcome, {user.displayName}</h1>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 my-auto bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
                    >
                        {'Log out'}
                    </button>
                </>
            )}
        </div>
    );
};

export default Navbar;