import DefaultTheme from 'vitepress/theme'
import './custom.css'
import EmojiIcon from './EmojiIcon.vue'
import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('EmojiIcon', EmojiIcon)
  },
}
