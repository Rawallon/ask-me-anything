import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from './../../Button/Button';
import { RoomCode } from './../../RoomCode/RoomCode';
import { HeaderContainer } from './style';

import logoImg from '../../../assets/images/logo.svg';

type HeaderProps = {
  user: any;
  signOut: () => void;
  isOwner?: boolean;
  roomId?: string;
  handleEndRoom?: () => void;
};

export function HeaderLayout({
  user,
  signOut,
  isOwner = false,
  roomId,
  handleEndRoom,
}: HeaderProps) {
  const history = useHistory();
  async function handleSignOut() {
    await signOut();
    history.go(0);
  }
  return (
    <HeaderContainer>
      <div className="content">
        <Link to="/">
          <img src={logoImg} alt="Letmeask" />
        </Link>
        <div>
          {roomId && <RoomCode code={roomId} />}
          {roomId && isOwner && (
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          )}
          {user && (
            <Button isOutlined onClick={handleSignOut}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
}
