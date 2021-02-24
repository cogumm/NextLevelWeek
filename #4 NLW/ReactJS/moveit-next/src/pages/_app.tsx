// import { useState } from "react";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import "../styles/global.css";

function MyApp({ Component, pageProps }) {
    // const [level, setLevel] = useState(1);

    // function levelUp() {
    //     setLevel(level + 1);
    // }

    return (
        // <ChallengesContext.Provider value={{ level, levelUp }}>
        <ChallengesProvider>
            <Component {...pageProps} />
        </ChallengesProvider>
        // </ChallengesContext.Provider>
    );
}

export default MyApp;
