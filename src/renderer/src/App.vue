<template>
  <div id="app">
    <MainMenu 
      v-if="screenMenu === 'menu'" 
      @newGame="openNewmGame" 
      @continue="continueGame"
      @openConfig="showOptions = true"
      @exit="exitGame" 
    />
    <StartScreen 
      v-if="screenMenu === 'start'" 
      @showScreen="startGame" 
    />
    <GameScreen 
      v-if="screenMenu === 'GameScreen'" 
      :name="playerName" 
    />
  </div>
  <ModalConfig :showModal="showOptions" @closeModal="showOptions = false" />
</template>

<script>
import { ref } from 'vue'
import MainMenu from './components/MainMenu.vue'
import ModalConfig from './components/ModalConfig.vue'
import StartScreen from './components/StartScreen.vue'
import GameScreen from './components/GameScreen.vue'

export default {
  name: 'App',
  components: { MainMenu, StartScreen, GameScreen, ModalConfig },
  setup() {
    const screenMenu = ref('menu')
    const playerName = ref('')
    const showOptions = ref(false)

    function openNewmGame() {
      screenMenu.value = 'start'
    }

    function startGame(name) {
      playerName.value = name
      screenMenu.value = 'GameScreen'
    }

    function continueGame() {
      playerName.value = localStorage.getItem('playerName') || 'Jogador'
      screenMenu.value = 'GameScreen'
    }

    function exitGame() {
      if (confirm('Deseja sair do jogo?')) {
        window.close()
      }
    }

    return { screenMenu, playerName, showOptions, openNewmGame, startGame, continueGame, exitGame }
  }
}
</script>
