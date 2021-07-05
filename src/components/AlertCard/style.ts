import styled from 'styled-components'

export const AlertContainer = styled.div`
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid rgb(0 0 0 / 0%);
  border-radius: 0.25rem;

  &.info {
    color: ${props => props.theme.colors.info};
    background-color: ${props => props.theme.colors.infoBG};
    border-color: ${props => props.theme.colors.info};
  }
  &.success {
    color: ${props => props.theme.colors.success};
    background-color: ${props => props.theme.colors.successBG};
    border-color: ${props => props.theme.colors.success};
  }
  &.danger {
    color: ${props => props.theme.colors.danger};
    background-color: ${props => props.theme.colors.dangerBG};
    border-color: ${props => props.theme.colors.danger};
  }
  &.warning {
    color: ${props => props.theme.colors.warning};
    background-color: ${props => props.theme.colors.warningBG};
    border-color: ${props => props.theme.colors.warning};
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
