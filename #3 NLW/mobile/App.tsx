import React from 'react';
import { useFonts } from "expo-font";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";

import Routes from './src/routes';

export default function App() {
    // Fonts personalizadas
    const [fontsLoaded] = useFonts({
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold
    });

    // Mostrando uma tela branca enquanto carrega as fontes
    if (!fontsLoaded) {
        return null;
    }

    return (
        <Routes />
    );
}
