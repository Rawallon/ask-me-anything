import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string
    colors: {
      cardBG: string
      cardBG80: string
      disabledCardBG: string
      disabledCardBG80: string
      appBG: string
      brandBG: string
      buttonText: string
      link: string
      text: string
      textHeading: string
      textMuted: string
      textDisabled: string
      textDeleted: string
      mutedInput: string
      mutedInputBorder: string
      mutedInputText: string

      highlightBG: string
      answered: string
      answeredBorder: string

      grad1: string
      grad2: string

      info: string
      infoBG: string
      warning: string
      warningBG: string
      success: string
      successBG: string
      danger: string
      dangerBG: string
    }
  }
}
