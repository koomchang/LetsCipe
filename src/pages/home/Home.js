import styles from './Home.module.css'
import RecipeForm from '../../components/RecipeForm'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Home() {

    const { user } = useAuthContext();

    return (
        <main className={styles.cont}>
            <aside className={styles.side_menu}>
                <RecipeForm uid={user.uid}></RecipeForm>
            </aside>
            <ul className={styles.content_list}>
                Recipe list
            </ul>
        </main>
    )
}