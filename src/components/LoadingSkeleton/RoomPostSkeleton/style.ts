import styled from 'styled-components'

export const RoomPostCard = styled.div`
  background: ${props => props.theme.colors.skeletonBG};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .user-picture {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: ${props => props.theme.colors.skeletonElement};
    }

    .user-name {
      margin-left: 8px;
      background: ${props => props.theme.colors.skeletonElement};
      width: 120px;
      height: 17px;
      border-radius: 4px;
    }
  }

  .post-info {
    .post-title {
      margin-bottom: 0.75rem;
      width: 590px;
      height: 33px;
      background: ${props => props.theme.colors.skeletonElement};
      border-radius: 4px;
    }
    .post-description {
      width: 100%;
      height: 120px;
      background: ${props => props.theme.colors.skeletonElement};
      border-radius: 4px;
    }
  }
`
