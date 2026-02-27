import DefaultTheme from 'vitepress/theme'
import './custom.css'
import EmojiIcon from './EmojiIcon.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    if (DefaultTheme.enhanceApp) {
      DefaultTheme.enhanceApp({ app })
    }
    app.component('EmojiIcon', EmojiIcon)
  },
}
