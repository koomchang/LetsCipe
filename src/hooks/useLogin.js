import { useState } from 'react'
import { appAuth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';

// 로그인 요청을 처리하는 Hook
export const useLogin = () => {

    // 로그인 상태, 에러, 로딩 상태 관리하는 state
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();


    const login = (email, password) => {
        setError(null);
        setIsPending(true); // IsPending 을 true로 설정하여 로딩 시작을 알려줌

        // Firebase에서 제공하는 함수를 이용하여 로그인
        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                // 로그인 성공
                const user = userCredential.user; // 로그인된 유저 정보
                dispatch({ type: 'login', payload: user }) // AuthContext의 login dispatch 함수를 호출하여 유저 정보 업데이트
                setError(null);
                setIsPending(false); // 로딩 종료
                if (!user) {
                    throw new Error('회원가입에 실패했습니다.');
                }
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            });
    }

    return { error, isPending, login }
}