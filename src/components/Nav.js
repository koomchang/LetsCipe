import { Link } from 'react-router-dom'
import styles from './Nav.module.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function Nav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    return (
        <nav className={styles.nav}>
            <Link to="/">
                <img className={styles.img} src='assets/logo.png' />
            </Link>
            <ul className={styles.list_nav}>
                {!user &&
                    <>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
                    </>
                }
                {user &&
                    <>
                        <strong>환영합니다 {user.displayName}님!</strong>
                        <li><Link to="/recipes">모든 레시피</Link></li>
                        <li><Link to="/my-recipe">나의 레시피</Link></li>
                        <li><Link to="/new-recipe">레시피 작성하기</Link></li>
                        <button className={styles.logoutBtn} type="button" onClick={logout}>로그아웃</button>
                    </>
                }
            </ul>
        </nav>
    )
}