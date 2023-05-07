import styles from './Home.module.css'

export default function Home() {

    return (
        <main className={styles.cont}>
            <p className={styles.first}>Let's Cipe은 당신의 새로운 요리 파트너입니다!</p>
            <p className={styles.second}>우리 사이트는 수많은 레시피와 요리 팁을 제공하여, 당신이 집에서 즐길 수 있는 맛있는 음식을 만들 수 있도록 도와드립니다. </p>
            <p className={styles.third}>이제 당신의 요리 경험을 더욱 즐겁고 풍성하게 만들어 보세요!</p>
        </main>
    )
}