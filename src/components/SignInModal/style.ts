import styled from 'styled-components'

export const ModalContainer = styled.div`
  min-width: 300px;
  width: 100%;
  text-align: center;
  max-width: 440px;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: #29292e;
    margin-bottom: 2rem;
  }
`

export const GoogleSignButton = styled.button`
  width: 100%;
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
