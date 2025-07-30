import { createApp } from 'vue'
import App from './src/App.vue'
import router from './src/router/router.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './src/styles/fonts.css'
import './src/styles/style.css'
import './src/styles/mainMenu.css'
import './src/styles/startScreen.css'
import './src/styles/gameScreen.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
