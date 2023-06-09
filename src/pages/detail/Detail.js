import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, getDoc, FieldPath, doc, getFirestore } from 'firebase/firestore';
import { appFireStore } from '../../firebase/config';
import styles from './Detail.module.css'
import firebase from 'firebase/compat/app';


export default function Detail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    // param 으로 받은 id로 해당 문서 뽑아옴 (firebase 공식문서 코드 참고 하였음)
    useEffect(() => {
        const fetchRecipe = async () => {
            const db = appFireStore;
            const docRef = doc(db, "recipe", id);
            const docSnap = await getDoc(docRef);
            if (!docSnap.empty) {
                const recipeDoc = docSnap.data();
                setRecipe(recipeDoc);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const date = new Date(recipe.createdTime.seconds * 1000);
    const formattedDate = date.toLocaleString();

    return (
        <div className={styles.detailContainer}>
            <h1 className={styles.detailTitle}>{recipe.title}</h1>
            <p className={styles.detailText}>{recipe.text}</p>
            <p className={styles.detailName}>{recipe.displayName}</p>
            <p className={styles.detailDate}> {formattedDate}</p>
        </div >
    );
}
