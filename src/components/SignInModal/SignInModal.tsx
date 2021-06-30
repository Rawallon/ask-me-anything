import React from 'react';
import { useAuth } from '../../hooks/useAuth';

import { GoogleSignButton, ModalContainer } from './style';
import googleIconImg from '../../assets/images/google-icon.svg';

export default function SignInModal({ handleClose }: any) {
  const { user, signInWithGoogle } = useAuth();

  async function handleSignIn() {
    if (!user) {
      await signInWithGoogle();
      handleClose();
    }
  }

  return (
    <ModalContainer>
      <header>
        <h1>Entrar</h1>
      </header>

      <section>
        <GoogleSignButton onClick={handleSignIn}>
          <div className="icon-wrapper">
            <img src={googleIconImg} alt="Logo do Google" className="icon" />
          </div>
          <p className="text">Continuar com o Google</p>
        </GoogleSignButton>
      </section>
    </ModalContainer>
  );
}
