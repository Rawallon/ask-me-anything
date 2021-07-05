import styled from 'styled-components'

export const QuestionCard = styled.div`
  background: ${props => props.theme.colors.cardBG};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${props => props.theme.colors.highlightBG};
    border: 1px solid ${props => props.theme.colors.brandBG};

    footer .user-info span {
      color: ${props => props.theme.colors.text};
    }
  }

  &.answered {
    background: ${props => props.theme.colors.answered};
    border: 1px solid ${props => props.theme.colors.answeredBorder};
  }

  p {
    color: ${props => props.theme.colors.text};
    &.deleted {
      font-size: 0.875rem;
      color: ${props => props.theme.colors.textMuted};
    }
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
        color: ${props => props.theme.colors.textMuted};
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
        color: ${props => props.theme.colors.textDeleted};
        gap: 8px;

        &.liked {
          color: ${props => props.theme.colors.brandBG};

          svg path {
            stroke: ${props => props.theme.colors.brandBG};
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`
