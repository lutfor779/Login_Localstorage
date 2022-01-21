import React, { createContext } from "react";
import useLogin from "../hooks/useLogin";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const allContext = useLogin();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;