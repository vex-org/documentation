import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installViewTransitions } from './view-transitions'
import './style.css'

const app = createApp(App)
app.use(router)
installViewTransitions(router)
app.mount('#app')
