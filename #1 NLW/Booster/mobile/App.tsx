import React from "react";
import { StatusBar } from "react-native";
// Antes de carregar as fonts ficar um "sinal de carregamento"
import { AppLoading } from "expo";

/**
 * Importando as fonts personalizadas.
 */
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";

/**
 * Importando as Rotas.
 */
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}
/* Personalização do Statusbar
 * backgroundColor="" só funciona no Android
 * translucent para que a Statusbar possa estar "por cima"
 */
