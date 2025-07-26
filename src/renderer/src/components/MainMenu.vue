<template>
  <div id="main-menu" class="d-flex flex-column justify-content-center align-items-center vh-100 text-white position-fixed top-0 start-0 w-100 h-100" style="z-index: 900;">
    <div class="logo-container">
      <img src="/src/assets/img/game/logo_tome_of_trials_2.png" class="input-img-logo" alt="Tome of Trials Logo" />
    </div>
    <button class="btn btn-menu btn-primary btn-lg mb-3" :disabled="!hasProgress" @click="$emit('continue')">Continuar</button>
    <button class="btn btn-menu btn-success btn-lg mb-3" @click="$emit('newGame')">Novo Jogo</button>
    <button class="btn btn-menu btn-secondary btn-lg mb-3" @click="$emit('openConfig')">Opções</button>
    <button class="btn btn-menu btn-danger btn-lg" @click="$emit('exit')">Sair do Jogo</button>

    <div class="video-background-container">
      <video autoplay muted loop class="video-background">
        <source src="/src/assets/videos/game/background_menu.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      hasProgress: false
    }
  },
  mounted() {
    this.hasProgress = !!localStorage.getItem('progress')

    const menuSound = document.getElementById("intro-menu")

    if (menuSound) {
      menuSound.currentTime = 0
      menuSound.play().catch(() => {})
    }

    this.addSounds()
  },
  methods: {
    addSounds() {
      document.querySelectorAll(".btn-menu").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          const hoverSound = document.getElementById("hover-button-menu")

          if (hoverSound) {
            hoverSound.currentTime = 0
            hoverSound.play().catch(() => {})
          }
        })

        btn.addEventListener("click", () => {
          const clickSound = document.getElementById("click-button-menu")

          if (clickSound) {
            clickSound.currentTime = 0
            clickSound.play().catch(() => {})
          }
        })
      })
    }
  }
}
</script>
