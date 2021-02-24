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
    challengesCompleted: number;
    activeChallenge: Challenge;
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

    const [activeChallenge, setActiveChallenge] = useState(null);

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

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}
