import styles from './RecipeList.module.css'

export default function RecipeList({ recipes }) {

    return (
        <>
            {
                recipes.map((item) => {
                    const date = new Date(item.createdTime.seconds * 1000);
                    const formattedDate = date.toLocaleString();
                    return (
                        <li key={item.id}>
                            <strong className={styles.title}>{item.title}</strong>
                            <p className={styles.text}>{item.text}</p>
                            <p className={styles.user}>글쓴이 : {item.displayName}</p>
                            <p className={styles.time}>작성시간 : {formattedDate}</p>
                        </li>
                    )
                })
            }
        </>
    )
}