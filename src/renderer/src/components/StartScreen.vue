<template>
  <div class="text-center mt-4" id="start-screen">
    <div class="logo-container-start-sreen">
      <img src="/img/game/logo_tome_of_trials_2.png" alt="Tome of Trials Logo"
        style="max-width: 300px; image-rendering: pixelated;" />
    </div>

    <h4 class="text-white mt-4">Escolha sua classe:</h4>
    <div class="row justify-content-center">
      <div v-for="character in charactersClass" :key="character.name" class="col-md-4 text-center mb-4">
        <div class="class-card" @click="openModal(character)">
          <img :src="baseUrl + character.image" class="class-icon" />
          <h5 class="text-white mt-2">{{ character.name }}</h5>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL 1: Classe -->
  <div v-if="selectedClass && !showNameModal" class="modal-overlay">
    <div class="modal-box">
      <h3>{{ selectedClass.name }}</h3>
      <img :src="selectedClass.image" class="modal-image" />
      <p><strong>Descrição:</strong> {{ selectedClass.description }}</p>
      <p><strong>Passiva:</strong> {{ selectedClass.passive }}</p>
      <p><strong>Poder:</strong> {{ selectedClass.power }}</p>
      <div class="modal-actions">
        <button class="btn btn-success" @click="proceedToNameInput">Selecionar</button>
        <button class="btn btn-secondary" @click="selectedClass = null">Fechar</button>
      </div>
    </div>
  </div>

<!-- MODAL 2: Nome do Jogador + Classe Selecionada -->
<div v-if="showNameModal" class="modal-overlay">
  <div class="modal-box">
    <img :src="selectedClass.image" class="modal-image" />
    <h4>{{ selectedClass.name }}</h4>
    <input class="form-control my-3" v-model="playerName" placeholder="Digite seu nome" type="text" />
    <div class="modal-actions">
      <button class="btn btn-primary" @click="confirmStartGame">Iniciar Jogo</button>
      <button class="btn btn-secondary" @click="cancelNameInput">Voltar</button>
    </div>
  </div>
</div>

  <button class="btn btn-secondary" @click="goBack">Voltar</button>

  <!-- Fundo animado -->
  <div class="video-background-container">
    <video autoplay muted loop class="video-background">
      <source src="/videos/game/background_menu.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  data() {
    return {
      selectedClass: null,
      showNameModal: false,
      playerName: '',
      charactersClass: [],
      baseUrl: import.meta.env.BASE_URL
    }
  },
  mounted() {
   this.loadCharacterClass()
  },
  methods: {
    async loadCharacterClass() {
      const url = new URL('/data/characters_class/characters_class.json', import.meta.url)
      const response = await fetch(url)
      this.charactersClass = await response.json()
    },
    openModal(character) {
      this.selectedClass = character
    },
    proceedToNameInput() {
      this.showNameModal = true
    },
    cancelNameInput() {
      this.showNameModal = false
    },
    confirmStartGame() {
      const playerNameTrimmed = this.playerName.trim()
      if (!playerNameTrimmed) {
        alert("Digite seu nome para começar!")
        return
      }
      if (!this.selectedClass) {
        alert("Escolha uma classe antes de começar!")
        return
      }

      localStorage.setItem("playerName", playerNameTrimmed)
      localStorage.setItem("playerClass", JSON.stringify(this.selectedClass))

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