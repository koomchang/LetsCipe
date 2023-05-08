import { useState } from 'react'
import { appAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    // signup 훅
    const signup = (email, password, displayName) => {
        setError(null);
        setIsPending(true);


        // firebase 제공 함수를 이용함 / 비밀번호 설정으로 유저 정보를 등록합니다
        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                // 회원 가입 후 로그인
                const user = userCredential.user;
                if (!user) {
                    throw new Error('회원가입에 실패했습니다.');
                }

                // 회원가입이 완료되고 유저 정보에 닉네임을 업데이트 (Firebase에서 기본으로 제공하지 않기 때문에 custom)
                updateProfile(appAuth.currentUser, { displayName })
                    .then(() => {
                        dispatch({ type: 'login', payload: user })
                        setError(null);
                        setIsPending(false);
                    }).catch((err) => {
                        setError(err.message);
                        setIsPending(false)
                    });
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            });
    }

    return { error, isPending, signup }
}