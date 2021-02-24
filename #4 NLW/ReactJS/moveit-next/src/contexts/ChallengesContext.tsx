import { createContext, ReactNode, useState } from "react";

interface ChallengesContextData {
    level: number;
    currentExp: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);

    // Estado atual da experiência do usuário.
    const [currentExp, setCurrentExp] = useState(0);

    // Desafios completados.
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    function levelUp() {
        setLevel(level + 1);
    }

    // Função para disparar um novo desafio.
    function startNewChallenge() {
        console.log("novo desafio.");
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                challengesCompleted,
                levelUp,
                startNewChallenge,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
