import { useHistory } from 'react-router-dom';

import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { useAuth } from '../hooks/useAuth';

import { RoomCard } from '../components/RoomCard/RoomCard';
import { CreateRoomCard } from './../components/CreateRoomCard/CreateRoomCard';
import { Container } from './../components/Layout/Container/Container';
import { HeaderLayout } from './../components/Layout/Header/HeaderLayout';
import { RoomCardSkeleton } from './../components/LoadingSkeleton/RoomCardSkeleton/RoomCardSkeleton';
import { CreateRoomCardSkeleton } from './../components/LoadingSkeleton/CreateRoomCardSkeleton/CreateRoomCardSkeleton';
import { useRooms } from '../hooks/useRooms';

export function RoomListing() {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const { rooms, isLoadingRooms, createRoom } = useRooms();
  console.log(rooms);

  async function handleCreateRoom(title: string, description: string) {
    const newRoomId = await createRoom(title, description);
    history.push('/rooms/' + newRoomId);
  }
  return (
    <Container>
      <HeaderLayout user={user} signOut={signOut} />
      <main>
        {isLoadingRooms ? (
          <>
            <CreateRoomCardSkeleton />
            <RoomCardSkeleton />
            <RoomCardSkeleton />
            <RoomCardSkeleton />
            <RoomCardSkeleton />
          </>
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
