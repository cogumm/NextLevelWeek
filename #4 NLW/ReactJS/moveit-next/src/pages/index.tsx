import { GetServerSideProps } from "next";
import Head from "next/head";

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Perfil";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
    level: number;
    currentExp: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    // console.log(props);

    return (
        <ChallengesProvider
            level={props.level}
            currentExp={props.currentExp}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>

                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Recuperando os dados do cookie.
    const { level, currentExp, challengesCompleted } = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            currentExp: Number(currentExp),
            challengesCompleted: Number(challengesCompleted),
        },
    };
};
