import styled from 'styled-components'

export const CreateRoomCardContainer = styled.div`
  background: #fefefe;
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

    background-color: #f6f7f8;
    border: 1px solid #edeff1;
    color: #1c1c1c;
    outline: none;

    &:hover {
      border: 1px solid #835afd;
      background: #fff;
    }
    &.open {
      border: 1px solid #835afd;
      background: #fff;
    }
  }
  button {
    margin-top: 1rem;
    width: max-content;
  }
`
