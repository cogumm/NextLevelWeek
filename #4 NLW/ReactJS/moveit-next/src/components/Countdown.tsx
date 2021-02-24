import { useEffect, useState } from "react";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

// Tempo para a contagem.
const timeCountdown = 0.05;

export function Countdown() {
    /**
     * O countdown precisa começar de um tempo e ir diminuindo em segundos.
     * (25 minutos * 60 segundos.)
     */
    const [time, setTime] = useState(timeCountdown * 60);

    // Estado da contage, se está ativa ou não, no começo está inativo.
    const [isActive, setIsActive] = useState(false);

    // Retornando o número de minutos totais.
    const minutes = Math.floor(time / 60);
    // Retornando o resto da divisão.
    const seconds = time % 60;

    // Retornando apenas o "primeiro" e o "segundo" número do minuto.
    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, "0")
        .split("");
    // Retornando apenas o "primeiro" e o "segundo" número do segundo.
    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, "0")
        .split("");

    // Função para iniciar a contagem.
    function startCountdown() {
        setIsActive(true);
    }

    // Função para resetar a contagem.
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        // Voltando para o tempo total.
        setTime(timeCountdown * 60);
    }

    useEffect(() => {
        // console.log(active);
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            console.log("ACABOU!");
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {isActive ? (
                <button
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                >
                    Abandonar cicle
                </button>
            ) : (
                <button
                    type="button"
                    className={styles.countdownButton}
                    onClick={startCountdown}
                >
                    Iniciar um cicle
                </button>
            )}
        </div>
    );
}
