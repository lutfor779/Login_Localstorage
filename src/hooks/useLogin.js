import { useState } from "react";

const useLogin = () => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    return {
        login,
        setLogin,
        user,
        setUser
    }
}
export default useLogin;