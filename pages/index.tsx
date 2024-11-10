import React, { useEffect, useState } from 'react';
import { signInWithGoogle } from '../services/auth';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push('/home');
    } catch (error) {
      console.error('Error during Google login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token === null || token === 'undefined' || /^\s*$/.test(token)) {
      router.push(`/`)
    } else {
      router.push(`/home`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex bg-gradient-to-r from-[#039ae5] via-[#28b5f6] to-[#b3e5fc] w-screen h-screen justify-center items-center'>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex items-center justify-center w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FcGoogle size={24} className="mr-2" />
        {isLoading ? 'Logging in...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default HomePage;