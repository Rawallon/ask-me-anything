import styled from 'styled-components'

export const HeaderContainer = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;

  .content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > a > img {
      max-height: 45px;
    }

    > div {
      display: flex;
      gap: 16px;

      button {
        height: 40px;
      }
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

    background: #fff;
    border: 1px solid #4af6ff;
    color: #000;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    transition: all 0.2s;

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
    border: 1px solid #4af6ff;
    color: #4af6ff;
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
      background: #fff;
      border: 0;
      color: #5bbbff;
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
        background: linear-gradient(to left, #4af6ff 0%, #4ceeff 100%);
        color: #fff;
      }
    }
  }
`
