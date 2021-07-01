import { useState } from 'react';
import ReactQuill from 'react-quill';
import '../../styles/quill.ama.css';

import anonAvatar from '../../assets/images/anon.svg';
import { Button } from './../Button/Button';
import { SignInDialog } from './../SignInDialog/SignInDialog';
import { CreateRoomCardContainer } from './style';

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
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [shouldHide, setShouldHide] = useState(true);

  function handleShouldDisplay() {
    if (!user) return;
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
        <img
          src={user ? user.avatar : anonAvatar}
          alt={user ? user.name : 'Anonymous'}
        />
        {user ? (
          <input
            className={`post-info ${shouldHide ? '' : 'open'}`}
            placeholder="Criar post"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            onFocus={handleShouldDisplay}
            onBlur={handleShouldDisplay}
          />
        ) : (
          <>
            <input
              className="post-info"
              placeholder="Criar post"
              onMouseDown={() => setIsSignInModalOpen(true)}
            />
            <SignInDialog
              isOpen={isSignInModalOpen}
              setIsOpen={setIsSignInModalOpen}
            />
          </>
        )}
      </div>
      <div className={`${shouldHide ? 'hidden-row' : 'second-row'}`}>
        <ReactQuill
          value={roomDescription}
          placeholder="Descrição (opcional)"
          onChange={(value) => setRoomDescription(value)}
          className="quill-create-post"
        />
        <Button onClick={handleCreateRoom}>Postar</Button>
      </div>
    </CreateRoomCardContainer>
  );
}
