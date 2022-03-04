import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Countdown from 'vue3-flip-countdown'

createApp(App)
  .use(router)
  .use(Countdown)
  .mount('#app')