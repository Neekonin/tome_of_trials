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
            <p class="card-text">{{ name }}</p>
            <hr/>
            <h6>⭐ Pontuação:</h6>
            <p class="fs-5 text-warning">{{ points }}</p>
            <hr/>
            <h6>❤️ Vidas:</h6>
            <div class="fs-4 text-danger">{{ '❤️'.repeat(lifes) }}</div>
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
            <button class="btn btn-secondary w-100 mb-2" @click="respond(i)">{{ alt }}</button>
          </div>
        </div>
        <div id="judgment-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'GameScreen',
  data() {
    return{
      showBlackScreen: false
    }
  },
  props: {
    name: String
  },
  setup() {
    const questionLibrary = ref([
      {
        question: "Qual campeão tem o título 'O Curador das Areias'?",
        alternatives: ["Zilean", "Nasus", "Xerath", "Azir"],
        correctQuestion: 3,
        difficulty: "Fácil"
      },
      {
        question: "Quem é o irmão de Yasuo?",
        alternatives: ["Zed", "Shen", "Yone", "Lee Sin"],
        correctQuestion: 2,
        difficulty: "Fácil"
      },
      {
        question: "Qual campeã dispara chamas com sua arma chamada Infernum?",
        alternatives: ["Jinx", "Aphelios", "Samira", "Senna"],
        correctQuestion: 1,
        difficulty: "Fácil"
      },
      {
        question: "Qual é o nome da ultimate da Lux?",
        alternatives: ["Luz da Justiça", "Explosão Prismática", "Iluminar", "Singularidade Brilhante"],
        correctQuestion: 1,
        difficulty: "Intermediária"
      },
      {
        question: "Quem é o pai da Vi no universo alternativo Arcane?",
        alternatives: ["Silco", "Vander", "Jayce", "Heimerdinger"],
        correctQuestion: 1,
        difficulty: "Intermediária"
      },
      {
        question: "Qual destes campeões NÃO é um yordle?",
        alternatives: ["Teemo", "Vex", "Kennen", "Zilean"],
        correctQuestion: 3,
        difficulty: "Intermediária"
      },
      {
        question: "Qual campeã tem um pet chamado Valor?",
        alternatives: ["Quinn", "Fiora", "Riven", "Kayle"],
        correctQuestion: 0,
        difficulty: "Difícil"
      },
      {
        question: "Quem é conhecido como 'O Kraken Rebelde'?",
        alternatives: ["Pyke", "Illaoi", "Nautilus", "Nilah"],
        correctQuestion: 3,
        difficulty: "Difícil"
      },
      {
        question: "Qual campeão usa o feitiço 'Devorar e Cuspir'?",
        alternatives: ["Kog'Maw", "Tahm Kench", "Cho'Gath", "Dr. Mundo"],
        correctQuestion: 1,
        difficulty: "Difícil"
      },
      {
        question: "Qual destes campeões é do Vazio?",
        alternatives: ["Jhin", "Rek'Sai", "Zoe", "Fiora"],
        correctQuestion: 1,
        difficulty: "Difícil"
      }
    ])

    const index = ref(0)
    const lifes = ref(3)
    const points = ref(0)
    const timeLeft = ref(60)
    const interval = ref(null)
    const currentQuestion = ref(null)

    function showQuestion() {
      if (index.value === 10 || index.value === 20) {
        alert('Iniciar julgamento (não implementado)')
        return
      }

      if (index.value >= questionLibrary.value.length) {
        alert('Fim de jogo! Pontuação final: ' + points.value)
        return
      }

      currentQuestion.value = questionLibrary.value[index.value]
      timeLeft.value = 60

      startTimer()
    }

    function startTimer() {
      clearInterval(interval.value)

      interval.value = setInterval(() => {
        timeLeft.value--

        if (timeLeft.value <= 0) {
          clearInterval(interval.value)
          lifes.value--

          if (lifes.value <= 0) {
            alert('Tempo esgotado! Fim de jogo.')
          } else {
            index.value++

            showQuestion()
          }
        }
      }, 1000)
    }

    function respond(i) {
      clearInterval(interval.value)

      const correctQuestion = currentQuestion.value.correctQuestion

      if (i === correctQuestion) {
        const diff = currentQuestion.value.difficulty

        points.value += diff === 'Fácil' ? 1 : diff === 'Intermediária' ? 2 : 3
      } else {
        lifes.value--

        if (lifes.value <= 0) {
          alert('Você perdeu todas as vidas! Fim de jogo.')
          return
        }
      }

      index.value++

      showQuestion()
    }

    function showWindowback() {
      const backModal = document.getElementById("back-modal");

      backModal.classList.remove("hidden");
    }

    function hideBackmodal() {
      const backModal = document.getElementById("back-modal");

      backModal.classList.add("hidden");
    }

    onMounted(() => {
      showQuestion()
    })

    return {
      lifes,
      points,
      timeLeft,
      currentQuestion,
      respond,
      showWindowback,
      hideBackmodal
    }
  },
  methods: {
    backToMainMenu() {
      this.showBlackScreen = true

      setTimeout(() => {
        this.$router.push({ name: 'MainMenu' })
      }, 3000)
    }
  }
}
</script>
