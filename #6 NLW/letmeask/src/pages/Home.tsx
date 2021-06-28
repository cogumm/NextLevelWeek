import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  // Estado para armazenar o código da sala.
  const [roomCode, setRoomCode] = useState("");

  // Navegando para a página de criação de uma sala.
  async function handleCreateRoom() {
    // Se o usuário NÃO estiver autenticado.
    if (!user) {
      await signInWithGoogle();
    }

    // Se já estiver autenticado, redireciona.
    history.push("/rooms/new");
  }

  // Função para entrar em uma sala existente.
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    // Se retornar vazio, nada irá acontecer.
    if (roomCode.trim() === "") {
      toast.error("Enter a valid room code.");
      return;
    }

    // Verificando se a sala que o usuário está tentando entrar realmente existe.
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // Caso retorne falso.
    if (!roomRef.exists()) {
      // alert("Room does not exists.");
      toast.error("Room does not exists.");
      return;
    }

    // Verificando se a sala já não está encerrada.
    if (roomRef.val().endedAt) {
      // alert("Room already closed.");
      toast.error("Room already closed.");
      return;
    }

    // Caso verdadeiro.
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <Toaster position="top-right" reverseOrder={false} />
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas."
        />
        <strong>Crie salas de Q&amp;E ao-vivo.</strong>
        <p>Tire as dúvidas da sua audência em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
