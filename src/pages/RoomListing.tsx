import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RoomCard } from '../components/RoomCard/RoomCard';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { CreateRoomCard } from './../components/CreateRoomCard/CreateRoomCard';
import { Container } from './../components/Layout/Container/Container';
import { HeaderLayout } from './../components/Layout/Header/HeaderLayout';

type FirebaseQuestions = Record<
  string,
  {
    title: string;
    description?: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    endedAt: string | null;
  }
>;

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

export function RoomListing() {
  const history = useHistory();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const { user, signOut } = useAuth();
  useEffect(() => {
    try {
      database.ref('rooms').on('value', function (snapshot) {
        const databaseRooms = snapshot.val();
        const firebaseQuestions: FirebaseQuestions = databaseRooms ?? {};

        const parsedQuestions = Object.entries(firebaseQuestions).map(
          ([key, value]) => ({
            id: key,
            title: value.title,
            description: value.description,
            author: value.author,
            endedAt: value.endedAt,
          }),
        );

        setRooms(parsedQuestions);
      });
    } catch {
      console.error('Ocorreu um erro ao carregar suas salas');
    }
  }, [user?.id]);

  async function handleCreateRoom(title: string, description: string) {
    if (title.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title,
      description,
      author: { id: user?.id, name: user?.name, avatar: user?.avatar },
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <Container>
      <HeaderLayout user={user} signOut={signOut} />

      <main>
        <CreateRoomCard user={user} createRoom={handleCreateRoom} />
        {rooms?.length <= 0 ? (
          <p>Não existe nenhuma sala até o momento.</p>
        ) : (
          rooms?.map((room) => <RoomCard key={room.id} room={room} />)
        )}
      </main>
    </Container>
  );
}
