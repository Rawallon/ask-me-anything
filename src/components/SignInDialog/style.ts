import styled from 'styled-components'

export const DialogContainer = styled.div`
  min-width: 300px;
  width: 100%;
  text-align: center;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;

  background: #fff;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: #29292e;
    margin-bottom: 2rem;
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

  .separator {
    font-size: 14px;
    color: rgb(168, 168, 179);
    margin: 32px 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    ::before {
      content: '';
      flex: 1 1 0%;
      height: 1px;
      background: rgb(168, 168, 179);
      margin-right: 16px;
    }

    ::after {
      content: '';
      flex: 1 1 0%;
      height: 1px;
      background: rgb(168, 168, 179);
      margin-left: 16px;
    }
  }
`

export const GoogleSignButton = styled.button`
  margin: auto;
  width: 70%;
  border-radius: 8px;
  font-weight: 500;
  background: rgb(234 67 53);
  color: rgb(255 255 255);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border: 0;
  transition: filter 0.2s;
  padding: 0.75rem 1.7rem;
`
