import { useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { CreateRoomCardContainer } from './style';
import { Button } from './../Button/Button';
import { useState } from 'react';

interface RoomItemProps {
  user:
    | {
        id: string;
        name: string;
        avatar: string;
      }
    | undefined;
  createRoom: (title: string, description: string) => void;
}

export function CreateRoomCard({ user, createRoom }: RoomItemProps) {
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [shouldHide, setShouldHide] = useState(true);

  function handleShouldDisplay() {
    if (shouldHide === true) {
      setShouldHide(false);
    } else if (roomName === '') {
      setShouldHide(true);
    }
  }

  function handleCreateRoom() {
    createRoom(roomName, roomDescription);
  }

  return (
    <CreateRoomCardContainer>
      <div className="first-row">
        <img src={user?.avatar} alt={user?.name} />
        <input
          className="post-info"
          placeholder="Criar post"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          onFocus={handleShouldDisplay}
          onBlur={handleShouldDisplay}
        />
      </div>
      <div className={`${shouldHide ? 'hidden-row' : ''} second-row`}>
        <TextareaAutosize
          minRows={7}
          className="open"
          placeholder="Descrição (opcional)"
          value={roomDescription}
          onChange={(event) => setRoomDescription(event.target.value)}
        />
        <Button onClick={handleCreateRoom}>Postar</Button>
      </div>
    </CreateRoomCardContainer>
  );
}
