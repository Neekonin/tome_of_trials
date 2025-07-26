<template>
  <div class="text-center mt-4" id="start-screen">
    <div class="logo-container-start-sreen">
      <img src="/src/assets/img/game/logo_tome_of_trials_2.png" alt="Tome of Trials Logo" style="max-width: 300px; image-rendering: pixelated;" />
    </div>
    <input class="form-control mb-3" v-model="name" placeholder="Digite seu nome" type="text" />
    <button class="btn btn-primary" @click="confirmStartGame">Iniciar Jogo</button>
  </div>
  <div class="video-background-container">
    <video autoplay muted loop class="video-background">
      <source src="/src/assets/videos/game/background_menu.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    confirmStartGame() {
      const name = this.name.trim()

      if (!name) {
        alert("Digite seu nome para começar!")
        return
      }

      localStorage.setItem("playerName", name)

      this.$emit('showScreen', name)
    }
  }
}
</script>
