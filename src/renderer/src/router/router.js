import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../components/MainMenu.vue'
import StartScreen from '../components/StartScreen.vue'
import GameScreen from '../components/GameScreen.vue'

const routes = [
  {
    path: '/',
    name: 'MainMenu',
    component: MainMenu
  },
  {
    path: '/game',
    name: 'GameScreen',
    component: GameScreen
  },
  {
    path: '/start',
    name: 'StartScreen',
    component: StartScreen
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
