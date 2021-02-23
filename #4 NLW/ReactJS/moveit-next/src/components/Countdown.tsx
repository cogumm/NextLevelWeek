import { useEffect, useState } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
    /**
     * O countdown precisa começar de um tempo e ir diminuindo em segundos.
     * (25 minutos * 60 segundos.)
     */
    const [time, setTime] = useState(25 * 60);

    // Estado da contage, se está ativa ou não, no começo está inativo.
    const [active, setActive] = useState(false);

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
        setActive(true);
    }

    useEffect(() => {
        // console.log(active);
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [active, time]);

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

            <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}
