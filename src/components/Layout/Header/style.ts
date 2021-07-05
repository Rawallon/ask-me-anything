import styled from 'styled-components'

export const HeaderContainer = styled.header`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.mutedInputBorder};

  .content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      max-height: 45px;
    }

    > div {
      display: flex;
      gap: 16px;
    }
  }
`

export const UserMenu = styled.div`
  text-align: left;
  display: inline-block;
  position: relative;

  .button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    transition: all 0.2s;

    background: ${props => props.theme.colors.cardBG};
    border: 1px solid ${props => props.theme.colors.brandBG};
    color: ${props => props.theme.colors.link};
    &.filled {
      background: ${props => props.theme.colors.link};
      border: 1px solid ${props => props.theme.colors.brandBG};
      color: ${props => props.theme.colors.cardBG};
      &:active {
        background: ${props => props.theme.colors.brandBG};
      }
    }

    svg {
      width: 17px;
      height: 17px;
      margin-left: 0.5rem;
      transition: all 0.2s;
      transform: scale(1);
    }
    &:active {
      background: rgba(74, 246, 255, 20%);
      svg {
        transform: scale(0.7);
      }
    }
  }

  .dropdown {
    margin-top: 0.25rem;
    border-radius: 8px;
    width: 100%;
    background: rgb(255, 255, 255);
    border: 1px solid ${props => props.theme.colors.brandBG};
    color: ${props => props.theme.colors.brandBG};
    padding: 0.25rem;

    transform-origin: top right;
    position: absolute;
    right: 0;
    top: 100%;

    display: flex;
    flex-direction: column;

    button {
      cursor: pointer;
      text-align: left;
      background: ${props => props.theme.colors.cardBG};
      border: 0;
      color: ${props => props.theme.colors.brandBG};
      border-radius: 8px;

      font-size: 0.875rem;
      line-height: 1.25rem;

      padding: 0.5rem;

      display: flex;
      align-items: center;
      svg {
        width: 17px;
        height: 17px;
        margin-right: 0.5rem;
        transition: all 0.2s;
        transform: scale(1);
      }

      &:hover {
        background: linear-gradient(
          to right,
          ${props => props.theme.colors.grad1} 0%,
          ${props => props.theme.colors.grad2} 100%
        );
        color: ${props => props.theme.colors.buttonText};
      }
    }
  }
`
