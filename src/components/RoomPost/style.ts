import styled from 'styled-components'

export const RoomPostCard = styled.div`
  background: ${props => props.theme.colors.cardBG};
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
      color: ${props => props.theme.colors.textMuted};
      font-size: 14px;
    }
  }

  .post-info {
    h1 {
      margin-bottom: 1.5rem;
    }
    p {
      color: ${props => props.theme.colors.textMuted};
      font-size: 16px;
      line-height: 24px;
    }
  }
`
