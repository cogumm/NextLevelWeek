import { Toaster, toast } from "react-hot-toast";

import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  // Função de copar o código da sala.
  function copyRoomCodeToClipboard() {
    toast.success("Código da sala copiado com sucesso!", {
      id: props.code,
      style: {
        width: "40rem",
      },
    });

    navigator.clipboard.writeText(props.code);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </>
  );
}
