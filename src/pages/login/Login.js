import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isPending, login } = useLogin();

    //  email, password를 리액트에서 관리하도록 설정
    const handleData = (event) => {
        if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        }
    }

    // form submit 할 때 이벤트 핸들린
    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
    }

    return (
        <form className={styles.login_form} onSubmit={handleSubmit}>
            <fieldset>
                <legend>로그인</legend>
                <label htmlFor='myEmail'>email : </label>
                <input type="email" id="myEmail" required value={email} onChange={handleData} />

                <label htmlFor='myPassWord'>password : </label>
                <input type="password" id="myPassWord" required value={password} onChange={handleData} />

                {!isPending && <button type='submit' className={styles.btn}>로그인</button>}
                {isPending && <strong>로그인 진행중입니다..!</strong>}
                {error && <strong>{error}</strong>}

            </fieldset>
        </form>
    )
}