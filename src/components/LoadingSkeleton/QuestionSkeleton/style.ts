import styled from 'styled-components'

export const QuestionCard = styled.div`
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.skeletonBG};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + & {
    margin-top: 8px;
  }

  .post-question {
    background: ${props => props.theme.colors.skeletonElement};
    width: 50%;
    padding: 12px 15px;
    height: 22px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      .user-picture {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${props => props.theme.colors.skeletonElement};
      }
      .user-name {
        margin-left: 8px;
        width: 70px;
        height: 17px;
        background: ${props => props.theme.colors.skeletonElement};
      }
    }

    > div {
      display: flex;
      gap: 16px;
      .user-option {
        border-radius: 4px;
        background: ${props => props.theme.colors.skeletonElement};
        width: 24px;
        height: 24px;
      }
    }
  }
`
