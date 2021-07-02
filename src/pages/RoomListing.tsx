import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import { RoomCard } from '../components/RoomCard/RoomCard';
import { CreateRoomCard } from './../components/CreateRoomCard/CreateRoomCard';
import { Container } from './../components/Layout/Container/Container';
import { HeaderLayout } from './../components/Layout/Header/HeaderLayout';
import Loader from '../components/Loader/Loader';

type FirebaseReturn = Record<
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
    questions: any[];
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
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const { user, signOut } = useAuth();
  useEffect(() => {
    try {
      database.ref('rooms').on('value', function (snapshot) {
        const databaseRooms = snapshot.val();
        const mappedRooms = Object.entries(
          (databaseRooms as FirebaseReturn) ?? {},
        ).map(([key, value]) => ({
          id: key,
          title: value.title,
          description: value.description,
          author: value.author,
          endedAt: value.endedAt,
          questionNum: Object.keys(value.questions || {}).length,
        }));
        // Ended rooms go to bottom, then sorts by number of comments
        setRooms(
          mappedRooms.sort((a, b) =>
            Number(!!b.endedAt) > Number(!!a.endedAt)
              ? -1
              : a.questionNum < b.questionNum
              ? 0
              : -1,
          ),
        );
        setIsLoading(false);
      });
    } catch {
      console.error('Ocorreu um erro ao carregar as salas');
    }
  }, []);

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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <CreateRoomCard user={user} createRoom={handleCreateRoom} />
            {rooms?.length <= 0 ? (
              <div className="empty-listing">
                <img src={emptyQuestionsImg} alt="Não há nenhuma sala criada" />
                <h2>Não existe nenhuma sala até o momento.</h2>
                <p>
                  {!user
                    ? 'Faça o seu login e seja a primeira pessoa a criar uma sala!'
                    : 'Seja a primeira pessoa a criar uma sala!'}
                </p>
              </div>
            ) : (
              rooms?.map((room) => <RoomCard key={room.id} room={room} />)
            )}
          </>
        )}
      </main>
    </Container>
  );
}
