import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles/fonts.css'
import './styles/style.css'
import './styles/mainMenu.css'
import './styles/gameScreen.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
