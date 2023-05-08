import { useState } from "react";
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// 로그아웃 요청을 처리하는 Hook
export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = () => {
        setError(null);
        setIsPending(true);

        // firebase 에서 제공하는 함수를 이용하여 로그아웃
        signOut(appAuth).then(() => {
            dispatch({ type: 'logout' }); // context의 상태를 'logout' 액션을 dispatch 하여 변경
            setError(null);
            setIsPending(false);
        }).catch((error) => {
            setError(error.message);
            setIsPending(false);
        })
    }
    return { error, isPending, logout }
}