import styles from './NewRecipe.module.css'
import RecipeForm from '../../components/RecipeForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection';

export default function NewRecipe() {

    const { user } = useAuthContext();
    const { documents, error } = useCollection('recipe');

    return (
        <main className={styles.cont}>
            <aside className={styles.side_menu}>
                <RecipeForm uid={user.uid} displayName={user.displayName}></RecipeForm>
            </aside>
        </main>
    )
}