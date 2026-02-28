import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { Analytics } from "@vercel/analytics/vue"

const app = createApp(App)
app.use(router)
app.mount('#app')
