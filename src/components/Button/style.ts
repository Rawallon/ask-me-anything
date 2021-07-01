import styled from 'styled-components'

export const ButtonContainer = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: #53d7ff;
  color: #fff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: all 0.2s;

  img {
    margin-right: 8px;
  }

  &.outlined {
    background: #fff;
    border: 1px solid #5bbbff;
    color: #5bbbff;
  }

  &:not(:disabled):hover {
    background: #5bbbff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
