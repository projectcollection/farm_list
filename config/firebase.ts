// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, StorageReference } from "firebase/storage";

import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebase?.apiKey,
    authDomain: Constants.manifest?.extra?.firebase?.authDomain,
    projectId: Constants.manifest?.extra?.firebase?.projectId,
    storageBucket: Constants.manifest?.extra?.firebase?.storageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebase?.messagingSenderId,
    appId: Constants.manifest?.firebase?.extra?.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function storage_ref(path: string): StorageReference {
    return ref(storage, path);
}
