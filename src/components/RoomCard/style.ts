import styled from 'styled-components'
interface RoomCardContainerProps {
  readonly isEnded: boolean
}
export const RoomCardContainer = styled.div<RoomCardContainerProps>`
  cursor: pointer;
  background: ${props =>
    props.isEnded
      ? props.theme.colors.disabledCardBG
      : props.theme.colors.cardBG};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + & {
    margin: 2rem 0;
  }

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.textMuted};
    font-size: 14px;

    span {
      color: ${props => props.theme.colors.text};
    }
  }

  .post-info {
    h1 {
      margin-bottom: 0.75rem;
    }
    .post-description {
      color: ${props => props.theme.colors.textMuted};
      font-size: 16px;
      line-height: 24px;
      position: relative;
      max-height: 70px;
      overflow: hidden;
      margin: -12px -15px;
    }
    .post-description::before {
      z-index: 1;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(
        180deg,
        ${({ isEnded, theme }) => (isEnded ? 'transparent' : 'transparent')} 20%,
        ${({ isEnded, theme }) =>
            isEnded ? theme.colors.disabledCardBG80 : theme.colors.cardBG80}
          40%,
        ${({ isEnded, theme }) =>
            isEnded ? theme.colors.disabledCardBG : theme.colors.cardBG}
          100%
      );
    }
  }
`
