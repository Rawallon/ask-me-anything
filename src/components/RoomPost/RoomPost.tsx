import React from 'react';
import './RoomPost.scss';

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
    <div className="wrapper">
      <div className="user-info">
        <img src={author.avatar} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div className="post-info">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
