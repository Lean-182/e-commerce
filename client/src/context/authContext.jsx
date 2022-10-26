import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const authContext = createContext();

export const useAuth = () => {
    console.log('ENTRA ACA')
    const context = useContext(authContext);
    if (!context) throw new Error("There is not auth provider");
    return context;
}



export function AuthProvider({ children }) {
         const [user, setUser] = useState(null);
    //     const singup = (email, password) =>
    //         createUserWithEmailAndPassword(auth, email, password);
    
     const googleLogin = () => {
        console.log('ENTRA ACA GOOGLELOGIN')
        const googleProvider = new GoogleAuthProvider;
        return signInWithPopup(auth, googleProvider);
    }
     const logout = () => signOut(auth);

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log({ currentUser });
            setUser(currentUser);
            // setLoading(false);
        });
        return () => unsubuscribe();
    }, []);

    return <authContext.Provider value={{ user, googleLogin, logout }}>{children}</authContext.Provider>;
};
