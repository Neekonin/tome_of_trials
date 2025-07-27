<template>
  <transition name="fade">
    <div v-if="visible" id="main-menu" class="d-flex flex-column justify-content-center align-items-center vh-100 text-white position-fixed top-0 start-0 w-100 h-100" style="z-index: 900;">
      <div class="logo-container">
        <img src="/src/assets/img/game/logo_tome_of_trials_2.png" class="input-img-logo" alt="Tome of Trials Logo" />
      </div>
      <button class="btn btn-menu btn-primary btn-lg mb-3" :disabled="!hasProgress" @click="playClickSound(); continueGame()" @mouseenter="playHoverSound">Continuar</button>
      <button class="btn btn-menu btn-success btn-lg mb-3" @click="playClickSound(); startGame()" @mouseenter="playHoverSound">Novo Jogo</button>
      <button class="btn btn-menu btn-secondary btn-lg mb-3" @click="playClickSound(); showModal = true" @mouseenter="playHoverSound">Opções</button>
      <button class="btn btn-menu btn-danger btn-lg" @click="playClickSound(); exitGame()" @mouseenter="playHoverSound">Sair do Jogo</button>

      <div class="pixel-modal" v-if="showModal">
        <div class="pixel-box">
          <h3>Opções</h3>
          <label for="musicVolume">Volume da música:</label>
          <input type="range" id="musicVolume" min="0" max="1" step="0.01" v-model="musicVolume" @input="updateMusicVolume" />
          <br /><br />
          <label for="soundVolume">Volume dos efeitos:</label>
          <input type="range" id="soundVolume" min="0" max="1" step="0.01" v-model="soundVolume" @input="updateSoundVolume" />
          <br /><br />
          <button @click="showModal = false">Fechar</button>
        </div>
      </div>

      <div class="video-background-container">
        <video autoplay muted loop class="video-background">
          <source src="/src/assets/videos/game/background_menu.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      hasProgress: false,
      showModal: false,
      musicVolume: 1,
      soundVolume: 1,
      visible: false
    }
  },
  mounted() {
    this.visible = true // ativa o fade-in

    this.musicVolume = parseFloat(localStorage.getItem('musicVolume') || 1)
    this.soundVolume = parseFloat(localStorage.getItem('soundVolume') || 1)

    this.updateMusicVolume()
    this.updateSoundVolume()

    this.hasProgress = !!localStorage.getItem('progress')

    const menuSound = document.getElementById("intro-menu")

    if (menuSound) {
      menuSound.currentTime = 0
      menuSound.play().catch(() => {})
    }
  },
  methods: {
    startGame() {
      this.$router.push({ name: 'StartScreen' })
    },
    continueGame() {
      const playerGameName = localStorage.getItem('playerName') || 'Jogador'
      this.$router.push({ name: 'GameScreen' })
    },
    openModalConfig() {
      this.$router.push({ name: 'ModalConfig' })
    },
    exitGame() {
      if (confirm('Deseja sair do jogo?')) {
        window.close()
      }
    },
    playHoverSound() {
      const sound = document.getElementById("hover-button-menu")
      if (sound) {
        sound.currentTime = 0
        sound.play().catch(() => {})
      }
    },
    playClickSound() {
      const sound = document.getElementById("click-button-menu")
      if (sound) {
        sound.currentTime = 0
        sound.play().catch(() => {})
      }
    },
    updateMusicVolume() {
      document.querySelectorAll('.music-game').forEach(el => {
        el.volume = this.musicVolume
      })
      localStorage.setItem('musicVolume', this.musicVolume)
    },
    updateSoundVolume() {
      document.querySelectorAll('.sound-effect').forEach(el => {
        el.volume = this.soundVolume
      })
      localStorage.setItem('soundVolume', this.soundVolume)
    }
  }
}
</script>
