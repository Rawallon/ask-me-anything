import styled from 'styled-components'

export const RoomCardContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + & {
    margin: 2rem 0;
  }

  .user-info {
    margin-bottom: 1rem;
    width: 210px;
    height: 17px;
    border-radius: 4px;
    background: #777;
  }

  .post-info {
    .post-title {
      margin-bottom: 0.75rem;
      width: 590px;
      height: 33px;
      background: #777;
      border-radius: 4px;
    }
    .post-description {
      color: #737380;
      font-size: 16px;
      line-height: 24px;
      position: relative;
      max-height: 70px;
      overflow: hidden;

      width: 100%;
      height: 72px;
      background: #777;
      border-radius: 4px;
    }
  }
`
