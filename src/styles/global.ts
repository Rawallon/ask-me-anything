import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: ${props => props.theme.colors.appBG};
  color: ${props => props.theme.colors.text};
}

body,
input,
button,
textarea {
  font: 400 16px 'Roboto', sans-serif;
}
h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: ${props => props.theme.colors.textHeading};
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.question-list {
  margin-bottom: 2rem;
}

.empty-listing {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 4rem 0;
  h2 {
    margin: 1rem 0 0.25rem 0;
  }
}

.animation-in {
  transition: all 0.1s ease-out;
  opacity: 100;
  transform: scale(1);
}

.animation-out {
  transition: all 0.1s ease-out;
  opacity: 0;
  transform: scale(0.9);
}

.overlay-in {
  transition: all 0.1s ease-out;
  opacity: 100;
}

.overlay-out {
  transition: all 0.1s ease-out;
  opacity: 0;
}
.quill-question {
  background: ${props => props.theme.colors.cardBG};
  p{
    color: ${props => props.theme.colors.textMuted};
  }
}

`
