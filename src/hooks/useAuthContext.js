import { useContext, usecontext } from "react";
import { AuthContext } from "../context/AuthContext";


// 인증 컨텍스트를 사용하는 커스텀 훅
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
}