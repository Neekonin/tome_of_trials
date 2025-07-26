<template>
  <div class="pixel-modal" v-if="showModal">
    <div class="pixel-box">
      <h3>Opções</h3>
      <label for="musicVolume">Volume da música:</label>
      <input type="range" id="musicVolume" min="0" max="1" step="0.01" v-model="musicVolume" @input="updateMusicVolume" />
      <br /><br />
      <label for="soundVolume">Volume dos efeitos:</label>
      <input type="range" id="soundVolume" min="0" max="1" step="0.01" v-model="soundVolume" @input="updateSoundVolume" />
      <br /><br />
      <button @click="$emit('closeModal')">Fechar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalConfig',
  props: {
    showModal: Boolean
  },
  data() {
    return {
      musicVolume: 1,
      soundVolume: 1
    }
  },
  mounted() {
    this.musicVolume = parseFloat(localStorage.getItem('musicVolume') || 1)
    this.soundVolume = parseFloat(localStorage.getItem('soundVolume') || 1)
    this.updateMusicVolume()
    this.updateSoundVolume()
  },
  methods: {
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
