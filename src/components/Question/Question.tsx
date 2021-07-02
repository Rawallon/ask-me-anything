import { ReactNode } from 'react';
import cx from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import anonAvatar from '../../assets/images/anon.svg';

import { QuestionCard } from './style';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  isAdminDeleted?: boolean;
  isUserDeleted?: boolean;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  isAdminDeleted = false,
  isUserDeleted = false,
  children,
}: QuestionProps) {
  return (
    <QuestionCard
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}>
      {isAdminDeleted || isUserDeleted ? (
        <p className="deleted">
          [
          {isAdminDeleted ? 'removido pela moderação' : 'removido pelo usuário'}
          ]
        </p>
      ) : (
        <ReactQuill
          value={content}
          readOnly={true}
          theme={'bubble'}
          className="quill-description"
        />
      )}
      {isAdminDeleted || isUserDeleted ? (
        <footer>
          <div className="user-info">
            <img src={anonAvatar} alt="Anonymous" />
            <span>[removido]</span>
          </div>
        </footer>
      ) : (
        <footer>
          <div className="user-info">
            <img src={author.avatar} alt={author.name} />
            <span>{author.name}</span>
          </div>
          <div>{children}</div>
        </footer>
      )}
    </QuestionCard>
  );
}
