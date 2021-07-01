import styled from 'styled-components'
interface RoomCardContainerProps {
  readonly isEnded: boolean
}
export const RoomCardContainer = styled.div<RoomCardContainerProps>`
  cursor: pointer;
  background: ${({ isEnded }) => (isEnded ? '#dbdcdd;' : '#fefefe;')};
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
      margin-bottom: 0.75rem;
    }
    .post-description {
      color: #737380;
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
        ${({ isEnded }) =>
            isEnded ? 'rgba(219, 220, 221, 0);' : 'rgba(255, 255, 255, 0)'}
          24.48%,
        ${({ isEnded }) =>
            isEnded ? 'rgba(219, 220, 221, 0.5);' : 'rgba(255, 255, 255, 0.5)'}
          30.73%,
        ${({ isEnded }) =>
            isEnded ? 'rgba(219, 220, 221, 0.8);' : 'rgba(255, 255, 255, 0.8)'}
          41.67%,
        ${({ isEnded }) => (isEnded ? '#dbdcdd;' : '#fefefe')} 100%
      );
    }
  }
`
