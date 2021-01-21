import { theme as chackaTheme } from '@chakra-ui/core'

const theme = {
  ...chackaTheme,
  font: {
    ...chackaTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 800,
  },
}

export default theme