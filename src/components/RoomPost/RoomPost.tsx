import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { RoomPostCard } from './style';

type PostProps = {
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
};

export function RoomPost({ title, description, author }: PostProps) {
  return (
    <RoomPostCard>
      <div className="user-info">
        <img src={author.avatar} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div className="post-info">
        <h1>{title}</h1>
        <ReactQuill
          value={description}
          readOnly={true}
          theme={'bubble'}
          className="quill-description"
        />
      </div>
    </RoomPostCard>
  );
}
