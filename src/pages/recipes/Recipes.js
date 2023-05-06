import styles from './Recipes.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection';
import RecipeList from '../../components/RecipeList';

export default function Recipes() {

    const { user } = useAuthContext();
    const { documents, error } = useCollection('recipe');

    return (
        <main className={styles.cont}>
            <ul className={styles.content_list}>
                {error && <strong>{error}</strong>}
                {documents && <RecipeList recipes={documents} />}
            </ul>
        </main>
    )
}