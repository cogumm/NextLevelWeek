import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

interface UF {
  id: number;
  nome: string;
  sigla: string;
}

interface City {
  id: number;
  nome: string;
  sigla: string;
}

const Home = () => {
  const [uf, setUF] = useState<UF[]>([]);
  const [city, setCity] = useState<City[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  const navigation = useNavigation();

  /**
   * API IBGE
   */
  useEffect(() => {
    axios
      .get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        setUF(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCity(response.data);
      });
  }, [selectedUf]);

  /**
   * Função para navegar de uma tela para a outra.
   */
  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      selectedUf,
      selectedCity,
    });
  }

  /**
   * Funções do "select"
   */
  function handleSelectedUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectedCity(city: string) {
    setSelectedCity(city);
  }

  return (
    // KeyboardAvoidingView - Para evitar que o teclado fique por cima da aplicação.
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamnos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{
              label: "Selecione uma UF",
              value: "0",
            }}
            style={{
              viewContainer: {
                backgroundColor: "#FFF",
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                borderRadius: 10,
                marginBottom: 8,
                paddingHorizontal: 24,
              },
            }}
            onValueChange={(item) => handleSelectedUf(item)}
            items={uf.map((item) => {
              return {
                label: `${item.sigla} - ${item.nome}`,
                value: item.sigla,
              };
            })}
          />

          <RNPickerSelect
            placeholder={{
              label: "Selecione uma cidade",
              value: "0",
            }}
            style={{
              viewContainer: {
                backgroundColor: "#FFF",
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                borderRadius: 10,
                marginBottom: 8,
                paddingHorizontal: 24,
              },
            }}
            onValueChange={(item) => handleSelectedCity(item)}
            items={
              city
                ? city.map((item) => {
                    return { label: `${item.nome}`, value: item.nome };
                  })
                : []
            }
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
