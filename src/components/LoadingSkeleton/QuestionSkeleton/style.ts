import styled from 'styled-components'

export const QuestionCard = styled.div`
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.cardBG};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background: #e5f4ff;
    border: 1px solid #53d7ff;

    footer .user-info span {
      color: #29292e;
    }
  }

  &.answered {
    background: #dbdcdd;
  }

  p {
    color: #29292e;
    &.deleted {
      font-size: 0.875rem;
      color: #737380;
    }
  }

  .post-question {
    background: #777;
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
        background: #777;
      }
      .user-name {
        margin-left: 8px;
        width: 70px;
        height: 17px;
        background: #777;
      }
    }

    > div {
      display: flex;
      gap: 16px;
      .user-option {
        border-radius: 4px;
        background: #777;
        width: 24px;
        height: 24px;
      }
    }
  }
`
