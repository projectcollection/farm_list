import { useState, useEffect } from "react";
import { onAuthStateChanged, User, Unsubscribe } from "firebase/auth";

import { auth } from "../../config/firebase";

export function useAuth() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribe;
    }, []);

    return { user };
}
