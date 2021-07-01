import { Dialog, Transition } from '@headlessui/react';
import React, { useRef } from 'react';

import { useAuth } from './../../hooks/useAuth';
import googleIconImg from '../../assets/images/google-icon.svg';
import { DialogContainer, GoogleSignButton } from './style';

type SignInDialogProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function SignInDialog({ isOpen, setIsOpen }: SignInDialogProps) {
  let GoogleButtonRef = useRef(null);

  const { user, signInWithGoogle } = useAuth();

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle();
      setIsOpen(false);
    }
  }

  return (
    <Transition
      show={isOpen}
      enterFrom="animation-out"
      enterTo="animation-in"
      leave="animation-out">
      <Dialog
        initialFocus={GoogleButtonRef}
        open={isOpen}
        onClose={() => {}}
        className="modal">
        <DialogContainer>
          <Dialog.Overlay className="overlay" />
          <Dialog.Title as="h1">Entrar</Dialog.Title>
          <Dialog.Description as="div" className="separator">
            Para continuar você precisa ter uma conta
          </Dialog.Description>
          <Dialog.Description>
            <GoogleSignButton ref={GoogleButtonRef} onClick={handleSignIn}>
              <div className="icon-wrapper">
                <img
                  src={googleIconImg}
                  alt="Logo do Google"
                  className="icon"
                />
              </div>
              <p className="text">Continuar com o Google</p>
            </GoogleSignButton>
          </Dialog.Description>
        </DialogContainer>
      </Dialog>
    </Transition>
  );
}
