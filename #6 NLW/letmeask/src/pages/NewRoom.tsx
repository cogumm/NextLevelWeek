import { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";

export function NewRoom() {
  // Tendo acesso ao usuário autenticado.
  const { user } = useAuth();

  const history = useHistory();

  const [newRoom, setNewRoom] = useState("");

  // Função de criação de uma sala.
  async function handleCreateRoom(event: FormEvent) {
    // Prevenindo o comportamento padrão do formulário.
    event.preventDefault();

    // Tendo acesso ao valor do input.
    // console.log(newRoom);
    if (newRoom.trim() === "") {
      toast.error("Room name cannot be empty.", {
        icon: "⚠️",
      });
      return;
    }

    const roomRef = database.ref("rooms");
    // "jogando" uma informação dentro de "rooms"
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    // Após o usuário crar a sala, ele será redirecionado para a nova sala criada.
    history.push(`/rooms/${firebaseRoom.key}`);
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

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente ? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
