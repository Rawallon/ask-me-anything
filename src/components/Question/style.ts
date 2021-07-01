import styled from 'styled-components'

export const QuestionCard = styled.div`
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + .question {
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
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

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

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2;

      display: flex;
      align-items: flex-end;

      &.like-button {
        color: #737380;
        gap: 8px;

        &.liked {
          color: #53d7ff;

          svg path {
            stroke: #53d7ff;
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`
