import styles from './Footer.module.css';

// fontawesome icon 이용
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faT } from '@fortawesome/free-solid-svg-icons';

// Footer 컴포넌트 생성
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_row}>
                    <div className={styles.footer_col}>
                        <h4>Let's Cipe - 레시피를 공유 플랫폼</h4>
                    </div>
                </div>
                <div className={styles.footer_social_icons}>
                    <a href="https://github.com/koomchang" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://koomchang.tistory.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faT} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
