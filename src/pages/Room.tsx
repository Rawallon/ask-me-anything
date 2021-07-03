import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import { AlertCard } from '../components/AlertCard/AlertCard';
import { Question } from '../components/Question/Question';
import {
  LikeIcon,
  WarningIcon,
  AnswerIcon,
  CheckIcon,
  DeleteIcon,
} from './../components/Icon/Icon';
import { Container } from './../components/Layout/Container/Container';
import { HeaderLayout } from './../components/Layout/Header/HeaderLayout';
import { QuestionForm } from './../components/QuestionForm/QuestionForm';
import { RoomPost } from './../components/RoomPost/RoomPost';
import { SignInDialog } from './../components/SignInDialog/SignInDialog';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import Loader from './../components/Loader/Loader';
import { RoomPostSkeleton } from '../components/LoadingSkeleton/RoomPostSkeleton/RoomPostSkeleton';
import { QuestionSkeleton } from './../components/LoadingSkeleton/QuestionSkeleton/QuestionSkeleton';

type RoomParams = {
  id: string;
};

export function Room() {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const params = useParams<RoomParams>();
  const [isOwner, setIsOwner] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
  const roomId = params.id;

  const { isLoading, title, description, author, questions, isEnded } =
    useRoom(roomId);

  useEffect(() => {
    if (!isLoading) {
      if (!author.id) history.push('/');
      if (author.id === user?.id) {
        setIsOwner(true);
      }
    }

    return () => {
      setIsOwner(false);
    };
  }, [author.id, history, isLoading, user?.id]);

  async function handleSendQuestion(questionText: string) {
    if (!user) {
      console.error('You must be logged in');
    }
    const question = {
      content: questionText,
      author: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
      isUserDeleted: false,
      isAdminDeleted: false,
    };
    await database.ref(`rooms/${roomId}/questions`).push(question);
  }

  // Admin Actions
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
  }

  async function handleCheckQuestionAsAnswered(
    questionId: string,
    isAnswered: boolean,
  ) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: !isAnswered,
    });
  }

  async function handleHighlightQuestion(
    questionId: string,
    isHighlighted: boolean,
  ) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: !isHighlighted,
    });
  }

  async function handleAdminDeleteQuestion(questionId: string) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAdminDeleted: true,
    });
  }

  // User action
  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined,
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function handleUserDeleteQuestion(questionId: string) {
    database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isUserDeleted: true,
    });
  }

  function renderQuestionCardButtons(question: any) {
    if (isOwner) {
      return (
        <>
          <button
            type="button"
            aria-label="Deletar a pergunta"
            onClick={() => setShowDeleteAdminModal(question.id)}>
            <DeleteIcon />
          </button>
          <button
            type="button"
            onClick={() =>
              handleCheckQuestionAsAnswered(question.id, question.isAnswered)
            }>
            <CheckIcon />
          </button>
          <button
            type="button"
            onClick={() =>
              handleHighlightQuestion(question.id, question.isHighlighted)
            }>
            <AnswerIcon />
          </button>
          <button
            className={`like-button ${question.likeId ? 'liked' : ''}`}
            type="button"
            aria-label="Marcar como gostei"
            onClick={() => handleLikeQuestion(question.id, question.likeId)}>
            {question.likeCount > 0 && <span>{question.likeCount}</span>}
            <LikeIcon />
          </button>
        </>
      );
    }
    if (user) {
      return (
        <>
          {user?.id === question.author.id && (
            <button
              type="button"
              aria-label="Deletar a pergunta"
              onClick={() => setShowDeleteUserModal(question.id)}>
              <DeleteIcon />
            </button>
          )}
          <button
            className={`like-button ${question.likeId ? 'liked' : ''}`}
            type="button"
            aria-label="Marcar como gostei"
            onClick={() => handleLikeQuestion(question.id, question.likeId)}>
            {question.likeCount > 0 && <span>{question.likeCount}</span>}
            <LikeIcon />
          </button>
        </>
      );
    } else {
      return (
        <button
          className={`like-button ${question.likeId ? 'liked' : ''}`}
          type="button"
          aria-label="Marcar como gostei"
          onClick={() => setShowSignInModal(true)}>
          {question.likeCount > 0 && <span>{question.likeCount}</span>}
          <LikeIcon />
        </button>
      );
    }
  }
  return (
    <Container>
      <ConfirmModal
        isOpen={!!showDeleteAdminModal}
        setIsOpen={setShowDeleteAdminModal}
        confirmAction={handleAdminDeleteQuestion}
        confirmProp={showDeleteAdminModal}
        textTitle="Deletar pergunta"
        textContent="Tem certeza que você deseja deletar a pergunta?"
        textCancel="Cancelar"
        textConfirm="Sim, deletar"
      />
      <ConfirmModal
        isOpen={!!showDeleteUserModal}
        setIsOpen={setShowDeleteUserModal}
        confirmAction={handleUserDeleteQuestion}
        confirmProp={showDeleteUserModal}
        textTitle="Deletar pergunta"
        textContent="Tem certeza que você deseja deletar a sua pergunta?"
        textCancel="Cancelar"
        textConfirm="Sim, deletar"
      />
      <SignInDialog isOpen={showSignInModal} setIsOpen={setShowSignInModal} />

      <HeaderLayout
        user={user}
        signOut={signOut}
        handleEndRoom={handleEndRoom}
        isOwner={isOwner}
        roomId={roomId}
        isEnded={isEnded}
      />
      <main>
        {isLoading ? (
          <RoomPostSkeleton />
        ) : (
          <RoomPost author={author} description={description} title={title} />
        )}
        {user && !isOwner && !isEnded && !isLoading && (
          <QuestionForm handleSendQuestion={handleSendQuestion} user={user} />
        )}
        {isEnded && (
          <AlertCard type="warning">
            <WarningIcon /> Essa sala foi encerrada
          </AlertCard>
        )}
        {isLoading ? (
          <>
            <QuestionSkeleton />
            <QuestionSkeleton />
          </>
        ) : (
          <div className="question-list">
            {questions.length < 1 && (
              <div className="empty-listing">
                <img src={emptyQuestionsImg} alt="Não há perguntas enviadas" />
                <h2>Nenhuma pergunta por aqui...</h2>
                {!isOwner && (
                  <p>
                    {!user
                      ? 'Faça o seu login e seja a primeira pessoa a fazer uma pergunta!'
                      : 'Seja a primeira pessoa a fazer uma pergunta'}
                  </p>
                )}
              </div>
            )}
            <>
              {questions.map((question) => {
                return (
                  <Question
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
                    isAdminDeleted={question.isAdminDeleted}
                    isUserDeleted={question.isUserDeleted}>
                    {!isEnded && renderQuestionCardButtons(question)}
                  </Question>
                );
              })}
            </>
          </div>
        )}
      </main>
    </Container>
  );
}
