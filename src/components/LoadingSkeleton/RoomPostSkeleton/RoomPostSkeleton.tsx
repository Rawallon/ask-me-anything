import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { RoomPostCard } from './style';
import { Shimmer } from './../Shimmer/Shimmer';

export function RoomPostSkeleton() {
  return (
    <RoomPostCard>
      <div className="user-info">
        <div className="user-picture"></div>
        <div className="user-name"></div>
      </div>
      <div className="post-info">
        <div className="post-title"></div>
        <div className="post-description"></div>
      </div>
      <Shimmer />
    </RoomPostCard>
  );
}
