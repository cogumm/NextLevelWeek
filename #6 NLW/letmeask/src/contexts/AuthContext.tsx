import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderType) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // Monitora o login do usuário.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    // Retorno que descadastra de todos os event listen que o usuário foi cadastrado.
    return () => {
      unsubscribe();
    };
  }, []);

  // Função para entrar com a conta do Google.
  async function signInWithGoogle() {
    // Integração com o Firebase, autenticação do usuário.
    const provider = new firebase.auth.GoogleAuthProvider();

    // Abrindo o login do Google como Popup.
    const result = await auth.signInWithPopup(provider);

    // console.log(result);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      // Se o usuário não tiver "nome" ou "foto", retorna um erro.
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
