import { createContext, ReactNode, useState } from "react";

import challenges from "../../challenges.json";

interface Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}
interface ChallengesContextData {
    level: number;
    currentExp: number;
    activeChallenge: Challenge;
    challengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
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

    const [activeChallenge, setActiveChallenge] = useState(null);

    // Calculando a xp do usuário de acordo com a xp atual do lvl.
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    // Função para disparar um novo desafio.
    function startNewChallenge() {
        // console.log("novo desafio.");
        const randomChallengeIndex = Math.floor(
            Math.random() * challenges.length
        );

        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    // Função chamada quando o usuário falhar.
    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                activeChallenge,
                challengesCompleted,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
