import { db } from "../firebase";
import { doc, setDoc, getDoc, } from 'firebase/firestore';

interface UserData {
    score: number;
    winStreak: number;
}

export const saveUserData = async (userId: string, score: number, winStreak: number): Promise<void> => {
    try {
        await setDoc(doc(db, 'users', userId), {
            score,
            winStreak,
        });
        console.log("Data saved successfully");
    } catch (error) {
        console.error("Error saving data: ", error);
    }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data() as UserData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
};