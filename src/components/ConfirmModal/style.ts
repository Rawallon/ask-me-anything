import styled from 'styled-components'

export const DialogContainer = styled.div`
  min-width: 300px;
  width: 100%;
  text-align: center;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;
  background: ${props => props.theme.colors.cardBG};
  z-index: 10;
  header {
    > svg {
      width: 48px;
      height: 48px;
      color: ${props => props.theme.colors.danger};
    }
  }
  h1 {
    position: relative;
    margin-bottom: 0.75rem;
  }
  .content {
    margin-bottom: 2.5rem;
  }

  .button-wrapper {
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    > button {
      cursor: pointer;
      border: 0;
      padding: 1rem 2rem;
      border-radius: 8px;
    }
    .confirm {
      background: ${props => props.theme.colors.danger};
      color: ${props => props.theme.colors.buttonText};
    }
    .cancel {
      /* background: #dbdcdd; */
      color: ${props => props.theme.colors.textDisabled};
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
