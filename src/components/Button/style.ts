import styled from 'styled-components'

export const ButtonContainer = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: ${props => props.theme.colors.brandBG};
  color: ${props => props.theme.colors.buttonText};
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
    background: ${props => props.theme.colors.buttonText};
    border: 1px solid ${props => props.theme.colors.brandBG};
    color: ${props => props.theme.colors.brandBG};
  }

  &:not(:disabled):hover {
    color: ${props => props.theme.colors.buttonText};
    background: ${props => props.theme.colors.brandBG};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
