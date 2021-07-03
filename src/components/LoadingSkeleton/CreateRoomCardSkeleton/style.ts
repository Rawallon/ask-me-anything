import styled from 'styled-components'

export const CreateRoomCardContainer = styled.div`
  position: relative;
  overflow: hidden;

  background: #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  margin: 2rem 0 1rem 0;

  .first-row {
    display: flex;
    align-items: center;
  }

  .user-image {
    background: #777;
    border-radius: 50%;
    margin-right: 1.5rem;
    flex-basis: 32px;
    height: 32px;
  }

  .fake-input {
    flex: 1;
    padding: 0.75rem 1rem;
    width: 100%;
    height: 45px;
    border-radius: 8px;
    background-color: #777;
  }
`
