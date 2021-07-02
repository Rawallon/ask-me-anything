import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../../assets/images/logo-dark.svg';
import {
  ChevronDownIcon,
  LogoutIcon,
  CopyIcon,
  LockIcon,
} from './../../Icon/Icon';
import { HeaderContainer, UserMenu } from './style';

type HeaderProps = {
  user: any;
  signOut: () => void;
  isOwner?: boolean;
  isEnded?: boolean;
  roomId?: string;
  handleEndRoom?: () => void;
};

export function HeaderLayout({
  user,
  signOut,
  isOwner = false,
  isEnded = false,
  roomId,
  handleEndRoom,
}: HeaderProps) {
  const history = useHistory();
  async function handleSignOut() {
    await signOut();
    history.go(0);
  }

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(roomId ? roomId : '');
  }

  return (
    <HeaderContainer>
      <div className="content">
        <Link to="/">
          <img src={logoImg} alt="Ask Me Anything Logo" />
        </Link>
        <div>
          {user && (
            <UserMenu>
              <Menu>
                <div>
                  <Menu.Button className="button">
                    {user?.name} <ChevronDownIcon />
                  </Menu.Button>
                </div>
                <Transition
                  enterFrom="animation-out"
                  enterTo="animation-in"
                  leave="animation-out">
                  <Menu.Items className="dropdown">
                    {roomId && isOwner && !isEnded && (
                      <Menu.Item>
                        <button onClick={handleEndRoom}>
                          <LockIcon />
                          Encerrar sala
                        </button>
                      </Menu.Item>
                    )}
                    {roomId && (
                      <Menu.Item>
                        <button onClick={copyRoomCodeToClipboard}>
                          <CopyIcon />
                          Copiar código
                        </button>
                      </Menu.Item>
                    )}
                    {user && (
                      <Menu.Item>
                        <button onClick={handleSignOut}>
                          <LogoutIcon />
                          Logout
                        </button>
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </UserMenu>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
}
