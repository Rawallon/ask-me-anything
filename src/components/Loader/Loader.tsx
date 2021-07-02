import React from 'react';
import { LoaderContainer } from './style';

export default function Loader() {
  return (
    <LoaderContainer>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </LoaderContainer>
  );
}
