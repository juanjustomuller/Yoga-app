import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../config/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);  //Guarda el estado del usuario autenticado.
    const [loader, setLoader] = useState(true); //Maneja un estado de carga mientras se verifica el estado de autenticación.
    const [error, setError] = useState(''); //Guarda los posibles errores durante la autenticación.

    const auth = getAuth(app);

    //signup new user
const signUp = async (email, password) => {  
    try {
        setLoader(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            setError('El correo electrónico ya está en uso. Por favor, intenta con otro.');
        } else {
            setError('Ocurrió un error durante el registro. Inténtalo de nuevo.');
        }
        setLoader(false);
        throw error;
    }
};

    //login user
    const login = async (email, password) => { //Inicia sesión con email y contraseña usando signInWithEmailAndPassword
        try {
            setLoader(true)
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setError(error.code);
            throw error
        }
    }

    //logout user 
    const logOut = async () => {  //Cierra sesión del usuario actual usando signOut.
        try {
            return await signOut(auth)
        } catch (error) {
            setError(error.code);
            throw error
        }
    }

    //update user profile
    const updateUser = async (name, photo) => { //Actualiza el perfil del usuario con un nuevo nombre y foto usando updateProfile.
        try {
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL: photo
            })
            setUser(auth.currentUser)
        } catch (error) {
            setError(error.code);
            throw error
        }
    }

    //using google login
    const googleProvider = new GoogleAuthProvider();  //Permite iniciar sesión con Google usando signInWithPopup y GoogleAuthProvider.

    const googleLogin = async () => {
        try {
            setLoader(true)
            return await signInWithPopup(auth, googleProvider)
        } catch (error) {
            setError(error.code);
            throw error
        }
    }

    //observer for users(observador de usuarios)
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
                
            if(user) {  //Si hay un usuario, hace una petición POST para obtener un token y lo guarda en localStorage
                axios.post('http://localhost:3000/api/set-token', {email: user.email, name: user.displayName})
                .then((data) => {
                    if(data.data.token) {
                        localStorage.setItem('token', data.data.token);
                        setLoader(false)
                    }
                })
            } else {  //Si no hay usuario, elimina el token de localStorage.
                localStorage.removeItem('token');
                setLoader(false)
            }
        })

        return () => unSubscribe()

    }, [])

    //Prepara un objeto con el estado del usuario, funciones de autenticación y errores.
    const contextValue = {user, signUp, login, logOut, updateUser, googleLogin, error, setError, loader, setLoader}
  return (
    <AuthContext.Provider value={contextValue}>  
        {children}
    </AuthContext.Provider>
  )
}
////Proporciona el contextValue a todos los componentes hijos. Los componentes que usen useAuth tendrán acceso a user, signUp, login, etc.
export default AuthProvider