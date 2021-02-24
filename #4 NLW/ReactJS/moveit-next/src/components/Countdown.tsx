import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

/**
 * Tempo para a contagem.
 * O countdown precisa começar de um tempo e ir diminuindo em segundos.
 * (25 minutos * 60 segundos.)
 */
const timeCountdown = 0.05;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(timeCountdown * 60);
    const [hasFinished, setHasFinished] = useState(false);

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
        // Começa um novo desafio.
        startNewChallenge();
    }

    useEffect(() => {
        // console.log(active);
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            // console.log("ACABOU!");
            setHasFinished(true);

            // Quanto finalizar o tempo tem que parar, por isso que troca o estado para falso.
            setIsActive(false);
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

            {hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
