import styled from 'styled-components'

export const RoomCardContainer = styled.div`
  cursor: pointer;
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin: 2rem 0;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: #a8a8b3;
    font-size: 14px;

    span {
      color: #737380;
    }
  }

  .post-info {
    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      color: #29292e;
    }
    p {
      color: #737380;
      margin-top: 0.75rem;
      font-size: 16px;
      line-height: 24px;
      position: relative;
    }
    p::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 24.48%,
        rgba(254, 254, 254, 0.5) 30.73%,
        rgba(254, 254, 254, 0.8) 41.67%,
        #fefefe 100%
      );
    }
  }
`
