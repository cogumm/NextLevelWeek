import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    );
}
