<!-- eslint-disable prettier/prettier -->
<template>
  <div class="pixel-modal">
    <div class="pixel-box">
      <h3>Opções</h3>
      <label for="musicVolume">Volume da música:</label>
      <input
        id="musicVolume"
        v-model="musicVolume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        @input="updateMusicVolume"
      />
      <br /><br />
      <label for="soundVolume">Volume dos efeitos:</label>
      <input
        id="soundVolume"
        v-model="soundVolume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        @input="updateSoundVolume"
      />
      <br /><br />
      <button @click="$emit('closeModal')">Fechar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalConfig',
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
      document.querySelectorAll('.music-game').forEach((el) => {
        el.volume = this.musicVolume
      })
      localStorage.setItem('musicVolume', this.musicVolume)
    },
    updateSoundVolume() {
      document.querySelectorAll('.sound-effect').forEach((el) => {
        el.volume = this.soundVolume
      })
      localStorage.setItem('soundVolume', this.soundVolume)
    }
  }
}
</script>
