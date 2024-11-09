import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";


export const getItems = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addItem = async (collectionName: string, data: Record<string, any>) => {
    return await addDoc(collection(db, collectionName), data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateItem = async (collectionName: string, id: string, data: Record<string, any>) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
};

// Delete a document
export const deleteItem = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
};