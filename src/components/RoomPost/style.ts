import styled from 'styled-components'

export const RoomPostCard = styled.div`
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin: 2rem 0;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      margin-left: 8px;
      color: #737380;
      font-size: 14px;
    }
  }

  .post-info {
    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      color: #29292e;
    }
    p {
      margin-top: 1.5rem;
      font-size: 16px;
      line-height: 24px;
    }
  }
`
