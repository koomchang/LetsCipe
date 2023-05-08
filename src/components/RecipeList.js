import styles from './RecipeList.module.css'
import { Link } from 'react-router-dom'

export default function RecipeList({ recipes }) {

    return (
        <>
            {   // recipes를 props로 받아서 map을 이용하여 렌더링
                recipes.map((item) => {
                    const date = new Date(item.createdTime.seconds * 1000);
                    const formattedDate = date.toLocaleString();
                    return (
                        <Link className={styles.link} to={`/recipes/${item.id}`}>
                            <li className={styles.RecipeList} key={item.id} >
                                <strong className={styles.title}>{item.title}</strong>
                                <p className={styles.user}> {item.displayName}</p>
                                <p className={styles.time}>{formattedDate}</p>
                            </li>
                        </Link>
                    )
                })
            }
        </>
    )
}