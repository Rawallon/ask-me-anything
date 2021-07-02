import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';

import logoImg from '../../assets/images/logo-dark.svg';
import { useAuth } from './../../hooks/useAuth';
import googleIconImg from '../../assets/images/google-icon.svg';
import { DialogContainer, GoogleSignButton, DialogOverlay } from './style';
import { CloseIcon } from './../Icon/Icon';

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={GoogleButtonRef}
        open={isOpen}
        onClose={() => {}}
        className="modal">
        <Transition.Child
          as={Fragment}
          enterFrom="animation-out"
          enterTo="animation-in"
          leave="animation-out">
          <DialogContainer>
            <Dialog.Title as="header">
              <img src={logoImg} alt="Ask Me Anything Logo" />
              <Dialog.Title as="h1">Entrar</Dialog.Title>
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </Dialog.Title>
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
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enterFrom="overlay-out"
          enterTo="overlay-in"
          leave="overlay-out">
          <Dialog.Overlay>
            <DialogOverlay />
          </Dialog.Overlay>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
