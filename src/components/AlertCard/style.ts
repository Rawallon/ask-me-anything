import styled from 'styled-components'

export const AlertContainer = styled.div`
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid rgb(0 0 0 / 0%);
  border-radius: 0.25rem;

  &.info {
    color: rgb(8 66 152);
    background-color: rgb(207 226 255);
    border-color: rgb(182 212 254);
  }
  &.success {
    color: rgb(15 81 50);
    background-color: rgb(209 231 221);
    border-color: rgb(186 219 204);
  }
  &.danger {
    color: rgb(132 32 41);
    background-color: rgb(248 215 218);
    border-color: rgb(245 194 199);
  }
  &.warning {
    color: rgb(102 77 3);
    background-color: rgb(255 243 205);
    border-color: rgb(255 236 181);
  }
  p {
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5rem;
      width: 24px;
      height: 24px;
    }
  }
`
