import styles from './MyRecipe.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import {useMyRecipeCollection} from '../../hooks/useMyRecipeCollection'
import RecipeList from '../../components/RecipeList';

export default function Recipes() {

    const { user } = useAuthContext();
    // 나의 recipe 가져옴
    const { documents, error } = useMyRecipeCollection('recipe', ["uid", "==", user.uid]);

    return (
        <main className={styles.cont}>
            <ul className={styles.content_list}>
                {error && <strong>{error}</strong>}
                {documents && <RecipeList recipes={documents} />}
            </ul>
        </main>
    )
}