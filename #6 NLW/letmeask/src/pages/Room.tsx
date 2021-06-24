import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function Room() {
  // Apenas usuários autenticados podem enviar novas perguntas.
  const { user } = useAuth();

  // "Pegando" o código da sala através dos parâmetros.
  const params = useParams<RoomParams>();
  const roomId = params.id;

  // Importando o Hook useRoom.
  const { questions, title } = useRoom(roomId);

  // Informação da nova pergunta.
  const [newQuestion, setNewQuestion] = useState("");

  // Função para a criação de uma nova pergunta.
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    // Se não existir nem um usuário, retornar um erro.
    // Dica de Toast: https://react-hot-toast.com/
    if (!user) {
      throw new Error("You must be logged in.");
    }

    // Criando a pergunta em si.
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      // Se ela está com "Highlighte" o destaque que o Admin dá na pergunta.
      isHighlighted: false,
      // Se já foi respondida ou não.
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    // "Apagando" a pergunta no textarea após ela ser enviada.
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que deseja perguntar ?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {/* {JSON.stringify(questions)} */}
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
