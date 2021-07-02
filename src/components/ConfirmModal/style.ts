import styled from 'styled-components'

export const DialogContainer = styled.div`
  min-width: 300px;
  width: 100%;
  text-align: center;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;
  background: #fff;
  z-index: 10;
  header {
    > svg {
      width: 48px;
      height: 48px;
      color: #e73f5d;
    }
  }
  h1 {
    position: relative;
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: #29292e;
    margin-bottom: 0.75rem;
  }
  .content{
    margin-bottom: 2.5rem;
  }

  .overlay {
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .button-wrapper {
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    > button{
      cursor: pointer;
      border 0;
      padding: 1rem 2rem;
      border-radius: 8px;
    }
    .confirm {
      background: #e73f5d;
      color: #fff;
    }
    .cancel {
      background: #dbdcdd;
      color: #737380;
    }
  }
`

export const DialogOverlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`
