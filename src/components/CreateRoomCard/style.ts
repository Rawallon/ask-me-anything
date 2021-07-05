import styled from 'styled-components'

export const CreateRoomCardContainer = styled.div`
  background: ${props => props.theme.colors.cardBG};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  margin: 2rem 0 1rem 0;

  .first-row {
    display: flex;
    align-items: center;
  }

  .hidden-row {
    display: none !important;
  }
  .second-row {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    > div {
      border: 1px solid ${props => props.theme.colors.brandBG};
      border-radius: 8px;
      > div {
        border: 1px solid ${props => props.theme.colors.mutedInputBorder};
      }
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 1.5rem;
  }
  input,
  textarea {
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 8px;

    background-color: ${props => props.theme.colors.mutedInput};
    border: 1px solid ${props => props.theme.colors.mutedInputBorder};
    color: ${props => props.theme.colors.mutedInputText};
    outline: none;

    &:hover {
      border: 1px solid ${props => props.theme.colors.brandBG};
      background: ${props => props.theme.colors.cardBG};
    }
    &.open {
      border: 1px solid ${props => props.theme.colors.brandBG};
      background: ${props => props.theme.colors.cardBG};
    }
  }
  button {
    margin-top: 1rem;
    width: max-content;
  }
`
