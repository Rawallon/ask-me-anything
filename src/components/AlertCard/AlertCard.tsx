import React, { ReactNode } from 'react';
import { AlertContainer } from './style';
type AlertCardProps = {
  type: string;
  children: ReactNode;
};
export function AlertCard({ type, children }: AlertCardProps) {
  return (
    <AlertContainer className={type}>
      <p>{children}</p>
    </AlertContainer>
  );
}
