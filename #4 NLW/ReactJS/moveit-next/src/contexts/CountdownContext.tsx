import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

/**
 * Tempo para a contagem.
 * O countdown precisa começar de um tempo e ir diminuindo em segundos.
 * (25 minutos * 60 segundos.)
 */
const timeCountdown = 25;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(timeCountdown * 60);
    const [hasFinished, setHasFinished] = useState(false);

    // Estado da contage, se está ativa ou não, no começo está inativo.
    const [isActive, setIsActive] = useState(false);

    // Retornando o número de minutos totais.
    const minutes = Math.floor(time / 60);
    // Retornando o resto da divisão.
    const seconds = time % 60;

    // Função para iniciar a contagem.
    function startCountdown() {
        setIsActive(true);
    }

    // Função para resetar a contagem.
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
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
            // console.log("ACABOU!");
            setHasFinished(true);

            // Quanto finalizar o tempo tem que parar, por isso que troca o estado para falso.
            setIsActive(false);

            // Começa um novo desafio.
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}
