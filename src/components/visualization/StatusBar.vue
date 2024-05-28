<template>
  <div :data-color="status" class="tt-ui__status-bar--container" @click="emitir()">
    <span class="tt-ui__status-bar--label"> {{ capitalizeFirstLetter(label) }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-status-bar',

  props: {
    label: { type: String, default: () => '' },
    status: { type: String, default: () => 'default' }
  },

  methods: {
    emitir() {
      this.$emit('click')
    },

    capitalizeFirstLetter(str) {
      str = str.toLowerCase()
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    }
  }
})
</script>
