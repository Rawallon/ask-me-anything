import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../../styles/quill.ama.css';
import { RoomCardContainer } from './style';

type RoomType = {
  id: string;
  title: string;
  description?: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  endedAt: string | null;
};

interface RoomItemProps {
  room: RoomType;
}

export function RoomCard({ room }: RoomItemProps) {
  const history = useHistory();

  async function handleJoinRoom() {
    if (room?.endedAt) {
      console.error('Falha ao entrar nesta sala. A sala já foi encerrada!');
      return;
    }

    history.push(`/rooms/${room.id}`);
    console.log('Você entrou na sala!');
  }

  return (
    <RoomCardContainer onClick={handleJoinRoom}>
      <div className="user-info">
        Criado por{` `}
        <span>{room.author.name}</span>
      </div>
      <div className="post-info">
        <h1>{room.title}</h1>
        {room.description && (
          <div className="post-description">
            <ReactQuill
              value={room.description}
              readOnly={true}
              theme={'bubble'}
              className="quill-short-description"
            />
          </div>
        )}
      </div>
    </RoomCardContainer>
  );
}
