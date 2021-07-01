import { ReactNode } from 'react';
import cx from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

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
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <QuestionCard
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}>
      <ReactQuill
        value={content}
        readOnly={true}
        theme={'bubble'}
        className="quill-description"
      />
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </QuestionCard>
  );
}
