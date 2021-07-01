import React, { FormEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import '../../styles/quill.ama.css';

import { FormContainer } from './style';
import { Button } from './../Button/Button';
import { SignInDialog } from './../SignInDialog/SignInDialog';

type QuestionFormProp = {
  handleSendQuestion: (value: string) => void;
  user:
    | {
        avatar: string;
        name: string;
      }
    | undefined;
};

export function QuestionForm({ handleSendQuestion, user }: QuestionFormProp) {
  const [newQuestion, setNewQuestion] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }
    handleSendQuestion(newQuestion);
    setNewQuestion('');
  }

  return (
    <FormContainer onSubmit={handleOnSubmit}>
      <ReactQuill
        value={newQuestion}
        placeholder="O que você quer perguntar?"
        onChange={(value) => setNewQuestion(value)}
        className="quill-question"
      />
      <SignInDialog isOpen={showDialog} setIsOpen={setShowDialog} />
      <div className="form-footer">
        {user ? (
          <div className="user-info">
            <img src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
          </div>
        ) : (
          <span>
            Para enviar uma pergunta,{' '}
            <button onClick={() => setShowDialog(true)}>faça seu login</button>.
          </span>
        )}
        <Button type="submit" disabled={!user}>
          Enviar pergunta
        </Button>
      </div>
    </FormContainer>
  );
}
