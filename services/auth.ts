import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider).catch(function (e) {
            if (e.code == 'auth/popup-blocked') {
                signInWithRedirect(auth, provider);
            }
        });
    } catch (error) {
        console.error('Error during Google login:', error);
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        console.log('User logged out');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};