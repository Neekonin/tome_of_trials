import { createRouter, createWebHashHistory } from 'vue-router'
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
    path: '/start',
    name: 'StartScreen',
    component: StartScreen
  },
  {
    path: '/game',
    name: 'GameScreen',
    component: GameScreen,
    props: (route) => ({ playerName: route.query.playerName || 'Jogador' })
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
