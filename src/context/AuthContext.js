import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

// 인증 컨텍스트 생성
const AuthContext = createContext();

// 전달되는 action에 따라서 state 변경하는 함수
const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload }
        case 'logout':
            return { ...state, user: null }
        case 'isAuthReady':
            return { ...state, user: action.payload, isAuthReady: true }
        default:
            return state
    }
}
// 인증 컨텍스트를 제공하는 컴포넌트 생성
const AuthContextProvider = ({ children }) => {

    // useReducer를 사용하여 인증 컨텍스트의 상태 관리
    const [state, dispatch] = useReducer(authReducer, {
        user: null, // 사용자 정보
        isAuthReady: false // 인증 상태 준비 여부
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            dispatch({ type: 'isAuthReady', payload: user });
        })
        return unsubscribe
    }, [])

    // 자식 컴포넌트에 인증 컨텍스트 제공
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }