<template>
  <!-- Tela Preta -->
  <div class="text-center mt-4" id="start-screen">
    <div class="logo-container-start-sreen">
      <img src="/src/public/img/game/logo_tome_of_trials_2.png" alt="Tome of Trials Logo" style="max-width: 300px; image-rendering: pixelated;" />
    </div>
    <input class="form-control mb-3" v-model="playerName" placeholder="Digite seu nome" type="text" />
    <button class="btn btn-primary" @click="confirmStartGame">Iniciar Jogo</button>
  </div>

  <button class="btn btn-secondary" @click="goBack">Voltar</button>

  <div class="video-background-container">
    <video autoplay muted loop class="video-background">
      <source src="/src/public/videos/game/background_menu.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  data() {
    return {
      playerName: '',
      showBlackScreen: false
    }
  },
  methods: {
    confirmStartGame() {
      const playerNameTrimmed = this.playerName.trim()

      if (!playerNameTrimmed) {
        alert("Digite seu nome para começar!")
        return
      }

      localStorage.setItem("playerName", playerNameTrimmed)

      this.$router.push({ 
        name: 'GameScreen',
        query: { 
          playerName: playerNameTrimmed
        } 
      })
    },
    goBack() {
      this.$router.push({ name: 'MainMenu' })
    }
  }
}
</script>
