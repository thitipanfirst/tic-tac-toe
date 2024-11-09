import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                try {
                    const token = await user.getIdToken();
                    localStorage.setItem('accessToken', token);
                } catch (error) {
                    console.error('Error getting access token:', error);
                }
            } else {
                setUser(null);
                localStorage.setItem('accessToken', '');
            }
        });

        return () => unsubscribe();
    }, []);
    return user;
};

export default useAuth;