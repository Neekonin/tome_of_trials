<template>
  <!-- Tela Preta -->
  <div v-if="showBlackScreen" class="black-screen"></div>

  <div class="game-screen-background">
    <div id="button-config" class="fixed-right">
      <!-- Botão para abrir o modal -->
      <div id="btn-back-menu"  @click="showWindowback()">
        <img src="/src/assets/img/game/config.png" class="input-img-config" alt="Configurações">
      </div>
    </div>
    <!-- Modal personalizado em estilo pixel -->
    <div id="back-modal" class="pixel-modal hidden">
      <div class="pixel-box">
        <p>Deseja realmente voltar ao menu?</p>
        <div class="pixel-buttons">
          <button id="confirm-back"  @click="backToMainMenu()">Sim</button>
          <button id="cancel-back" @click="hideBackmodal()">Não</button>
        </div>
      </div>
    </div>
    <div class="row mt-4" id="game-area">
      <div class="col-md-3">
        <div class="card bg-dark text-white" id="card-status-player">
          <div class="card-body">
            <h5 class="card-title">Jogador:</h5>
            <p class="card-text">{{ playerName }}</p>
            <hr/>
            <h6> Pontuação:</h6>
            <p class="fs-5 text-warning">{{ points }}</p>
            <hr/>
            <h6> Vidas:</h6>
            <div class="lives-container">
              <img v-for="n in lifes" :key="n" src="/src/assets/img/game/heart_life.png" alt="Vida" class="life-icon" />
            </div>
            <hr/>
            <h6><img src="/src/assets/img/game/red_crystal.png" class="life-icon" alt="Cristais"> Cristais:</h6>
              <p class="fs-5 text-warning">{{ crystals }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div id="quiz-container" v-if="currentQuestion">
          <div class="d-flex justify-content-end text-danger fw-bold fs-3 mb-3">
            ⏱️ Tempo: <span id="timer" class="ps-2">{{ timeLeft }}s</span>
          </div>
          <h4>{{ currentQuestion.question }}</h4>
          <small class="text-muted">Dificuldade: {{ currentQuestion.difficulty }}</small><br><br>
          <div v-for="(alt, i) in currentQuestion.alternatives" :key="i">
            <button
              class="btn w-100 mb-2"
              :class="{
                'btn-outline-primary': selectedAnswer !== i,
                'btn-primary': selectedAnswer === i,
                'disabled': answerConfirmed
              }"
              @click="selectAnswer(i)"
            >
              {{ alt }}
            </button>
          </div>
        </div>
        <div id="judgment-container"></div>
      </div>
    </div>
    <button
      class="btn btn-success mt-3"
      :disabled="selectedAnswer === null || answerConfirmed"
      @click="confirmAnswer"
    >
      Confirmar
    </button>
    <button 
      v-if="showNextButton" 
      class="btn btn-success mt-3" 
      @click="nextQuestion"
    >
      Próxima Página
    </button>
  </div>
  <div v-if="popupMessage" class="pixel-modal-overlay">
    <div class="pixel-modal-box">
      <p class="popup-text">{{ popupMessage }}</p>
      <button @click="closePopup" class="popup-ok-btn">OK</button>
    </div>
  </div>

  <!-- Modal de Escolha de Cartas -->
  <div v-if="showCardModal" class="pixel-modal-overlay-cards">
    <div class="pixel-modal-box-cards">
      <p>Escolha uma carta:</p>
      <div class="card-options">
        <div
          v-for="(card, index) in availableCards"
          :key="index"
          class="card-option"
          @click="selectCard(card)"
        >
          <img :src="card.image" alt="Card" class="card-image" />
        </div>
      </div>
    </div>
  </div>

<!-- Botão de abrir o livro de cartas -->
<div class="inventory-button" @click="showCardInventory = true">
  <img src="/src/assets/img/game/config.png" alt="Cartas" class="inventory-icon" />
</div>
<!-- Modal do Inventário -->
<div v-if="showCardInventory" class="card-inventory-modal">
  <div class="card-inventory-background">
    <h3 class="text-white text-center mb-3">Seu Grimório de Cartas</h3>
    <div class="d-flex flex-wrap justify-content-center gap-3">
      <div
        v-for="(card, index) in storedCards"
        :key="index"
        class="card-thumbnail"
        @click="selectStoredCard(index)"
      >
        <img :src="card.image" :alt="card.name" />
      </div>
    </div>

    <!-- Exibir carta selecionada -->
    <div v-if="selectedCard" class="selected-card-center text-center">
      <img :src="selectedCard.image" alt="Carta Selecionada" class="selected-card-img" />
      <h5 class="text-white mt-2">{{ selectedCard.name }}</h5>
      <button class="btn btn-success mt-2" @click="useSelectedCard()">Usar</button>
    </div>

    <!-- Fechar -->
    <button class="btn btn-danger mt-4" @click="closeInventory()">Fechar</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'GameScreen',
  props: ['playerName'],
  data() {
    return {
      showCardModal: false,
      showCardInventory: false,
      selectedCard: null,
      availableCards: [],
      cardSelectionPending: false,
      popupMessage: '',
      showBlackScreen: false,
      questionLibrary: [],
      index: 0,
      lifes: 3,
      crystals: 0,
      points: 0,
      timeLeft: 60,
      interval: null,
      currentQuestion: null,
      selectedAnswer: null,
      showNextButton: false,
      answerConfirmed: false,
      popupMessage: '',
      storedCards: []
    }
  },
  mounted() {
    this.loadQuestions()
  },
  methods: {
    async loadQuestions() {
      const res = await fetch('/src/data/questions/league_of_legends/questions.json')
      this.questionLibrary = await res.json()
      this.showQuestion()
    },
    shuffle(arr) {
      return [...arr].sort(() => Math.random() - 0.5)
    },
    async showCardSelection() {
      const response = await fetch('/src/data/cards/cards.json')
      const allCards = await response.json()

      this.availableCards = this.shuffle(allCards).slice(0, 4);
      this.showCardModal = true;
      this.cardSelectionPending = true;
    },
    selectCard(card) {
      if (card.immediate) {
        card.applyCardEffect(card)
      } else {
        this.storedCards.push(card)
        this.showPopup(`Você guardou a carta: ${card.name}`)
      }

      this.showCardModal = false;
      this.cardSelectionPending = false;
      this.showQuestion();
    },
    applyCardEffect(card) {
      switch (card.effect) {
        case 'skipQuestion':
          this.skipCurrentQuestion()
          break
        case 'shuffleAnswer':
          this.shuffleCorrectAnswer()
          break
        case 'addCrystals':
          this.crystals += 100
          break
        case 'freezeTime':
          this.freezeTimer()
          break
      }
    },
    useStoredCard(index) {
      this.selectedCard = this.storedCards[index]
      this.showCardInventory = true
    },
    selectStoredCard(index) {
      this.selectedCard = this.storedCards[index]
    },
    useSelectedCard() {
      if (this.selectedCard && this.selectedCard.effect) {
        this.selectedCard.effect()
      }

      const idx = this.storedCards.findIndex(c => c === this.selectedCard)
      if (idx !== -1) {
        this.storedCards.splice(idx, 1)
      }

      this.selectedCard = null
      this.showCardInventory = false
      this.showPopup('Carta usada com sucesso!')
    },
    closeInventory() {
      this.selectedCard = null
      this.showCardInventory = false
    },
    showPopup(msg) {
      this.popupMessage = msg;
    },
    closePopup() {
      this.popupMessage = '';
    },
    showQuestion() {
      if (this.index === 10 || this.index === 20) {
        this.showPopup('Iniciar julgamento (não implementado)')
        return
      }

      if (this.index >= this.questionLibrary.length) {
        this.showPopup('Fim de jogo! Pontuação final: ' + this.points)
        return
      }

      this.currentQuestion = this.questionLibrary[this.index]
      this.timeLeft = 60
      this.startTimer()
    },
    startTimer() {
      clearInterval(this.interval)

      this.interval = setInterval(() => {
        this.timeLeft--

        if (this.timeLeft <= 0) {
          clearInterval(this.interval)
          this.lifes--

          if (this.lifes <= 0) {
            this.showPopup('Tempo esgotado! Fim de jogo.')
          } else {
            this.index++
            this.showQuestion()
          }
        }
      }, 1000)
    },
    selectAnswer(i) {
      if (!this.answerConfirmed) {
        this.selectedAnswer = i
      }
    },
    confirmAnswer() {
      if (this.selectedAnswer === null) return

      clearInterval(this.interval)
      this.answerConfirmed = true

      const correct = this.currentQuestion.correctQuestion

      if (this.selectedAnswer === correct) {
        const diff = this.currentQuestion.difficulty
        this.points += diff === 'Fácil' ? 1 : diff === 'Intermediária' ? 2 : 3
        this.crystals += diff === 'Fácil' ? 5 : diff === 'Intermediária' ? 10 : 15
      } else {
        this.lifes--
        if (this.lifes <= 0) {
          this.showPopup('Você perdeu todas as vidas! Fim de jogo.')
          return
        }
      }

      this.showNextButton = true
    },
    nextQuestion() {
      this.index++
      this.selectedAnswer = null
      this.answerConfirmed = false
      this.showNextButton = false

      if (this.index > 0 && this.index % 5 === 0 && !this.cardSelectionPending) {
        this.showCardSelection();
        return;
      }

      this.showQuestion()
    },
    showWindowback() {
      const backModal = document.getElementById("back-modal")
      backModal.classList.remove("hidden")
    },
    hideBackmodal() {
      const backModal = document.getElementById("back-modal")
      backModal.classList.add("hidden")
    },
    backToMainMenu() {
      clearInterval(this.interval)

      this.showBlackScreen = true

      setTimeout(() => {
        this.$router.push({ name: 'MainMenu' })
      }, 3000)
    },
    showPopup(msg) {
      this.popupMessage = msg
    },
    closePopup() {
      this.popupMessage = ''
    }
  }
}
</script>
