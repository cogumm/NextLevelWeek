import { useEffect, useState } from "react";

import { useAuth } from "./useAuth";

import { database } from "../services/firebase";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  // Buscando as perguntas da sala.
  useEffect(() => {
    // console.log(roomId);
    // Referência da sala.
    const roomRef = database.ref(`rooms/${roomId}`);

    // // Buscando os dados das perguntas.
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      // console.log(room.val());
      // Convertendo em um array o Objeto das perguntas.
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            //Carregando os "likes"
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      // console.log(parsedQuestions);
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    // Removendo todos os event listners para essa referência da sala.
    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { questions, title };
}
