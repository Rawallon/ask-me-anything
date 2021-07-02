import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';

import { DialogContainer, DialogOverlay } from './style';
import { WarningIcon } from './../Icon/Icon';

type ConfirmModalProp = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  confirmAction: (questionId: string) => Promise<void>;
  textTitle?: string;
  textContent: string;
  textCancel?: string;
  textConfirm?: string;
  confirmProp: any;
};

export default function ConfirmModal({
  isOpen,
  setIsOpen,
  confirmAction,
  textTitle,
  textContent,
  textCancel,
  textConfirm,
  confirmProp,
}: ConfirmModalProp) {
  let initialButtonRef = useRef(null);

  function handleConfirmAction() {
    confirmAction(confirmProp);
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={initialButtonRef}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="modal">
        <Transition.Child
          as={Fragment}
          enterFrom="animation-out"
          enterTo="animation-in"
          leave="animation-out">
          <DialogContainer>
            <Dialog.Title as="header">
              <WarningIcon />
              <Dialog.Title as="h1">{textTitle || 'Alerta'}</Dialog.Title>
            </Dialog.Title>
            <Dialog.Description className="content">
              {textContent}
            </Dialog.Description>
            <Dialog.Description className="button-wrapper">
              <button className="confirm" onClick={handleConfirmAction}>
                {textConfirm || 'Confirmar'}
              </button>
              <button className="cancel" onClick={() => setIsOpen(false)}>
                {textCancel || 'Cancelar'}
              </button>
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
