import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { error, isPending, signup } = useSignup();

    // email, password, text를 react에서 관리하도록 설정
    const handleData = (event) => {
        if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        } else if (event.target.type === "text") {
            setDisplayName(event.target.value);
        }
    }
    // form submit 할 때 이벤트 핸들링
    const handleSubmit = (event) => {
        event.preventDefault();
        signup(email, password, displayName);
    }

    return (
        <form className={styles.signup_form} onSubmit={handleSubmit}>
            <fieldset>
                <legend>회원가입</legend>
                <label htmlFor='myEmail'>이메일 : </label>
                <input type="email" id="myEmail" required value={email} onChange={handleData} />

                <label htmlFor='myPassWord'>비밀번호 : </label>
                <input type="password" id="myPassWord" required value={password} onChange={handleData} />

                <label htmlFor='myNickName'>닉네임 : </label>
                <input type="text" id="myNickName" required value={displayName} onChange={handleData} />

                <button type='submit' className={styles.btn}>회원가입</button>
            </fieldset>
        </form>
    )
}