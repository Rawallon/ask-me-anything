import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import { AlertCard } from '../components/AlertCard/AlertCard';
import { Question } from '../components/Question/Question';
import { LikeIcon, WarningIcon } from './../components/Icon/Icon';
import { Container } from './../components/Layout/Container/Container';
import { HeaderLayout } from './../components/Layout/Header/HeaderLayout';
import { QuestionForm } from './../components/QuestionForm/QuestionForm';
import { RoomPost } from './../components/RoomPost/RoomPost';
import { SignInDialog } from './../components/SignInDialog/SignInDialog';

type RoomParams = {
  id: string;
};

export function Room() {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const params = useParams<RoomParams>();
  const [isOwner, setIsOwner] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
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
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${roomId}/questions`).push(question);
  }

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

  // Admin Commands
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

  function renderQuestionCardButtons(question: any) {
    if (isOwner) {
      return (
        <>
          <button
            type="button"
            onClick={() =>
              handleCheckQuestionAsAnswered(question.id, question.isAnswered)
            }>
            <img src={checkImg} alt="Marcar pergunta como respondida" />
          </button>
          <button
            type="button"
            onClick={() =>
              handleHighlightQuestion(question.id, question.isHighlighted)
            }>
            <img src={answerImg} alt="Dar destaque à pergunta" />
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
        <button
          className={`like-button ${question.likeId ? 'liked' : ''}`}
          type="button"
          aria-label="Marcar como gostei"
          onClick={() => handleLikeQuestion(question.id, question.likeId)}>
          {question.likeCount > 0 && <span>{question.likeCount}</span>}
          <LikeIcon />
        </button>
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
        <RoomPost author={author} description={description} title={title} />

        {!isOwner && !isEnded && (
          <QuestionForm handleSendQuestion={handleSendQuestion} user={user} />
        )}

        {isEnded && (
          <AlertCard type="warning">
            <WarningIcon /> Essa sala foi encerrada
          </AlertCard>
        )}
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
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}>
                {!isEnded && renderQuestionCardButtons(question)}
              </Question>
            );
          })}
        </div>
      </main>
    </Container>
  );
}
