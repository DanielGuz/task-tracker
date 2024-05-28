<template>
  <section>
    <wsui-header-bar title="Bienvenida" v-if="isHomePath" />
    <router-view />
  </section>
</template>

<script lang="ts">
import WsuiHeaderBar from '@/components/form/HeaderBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-dashboard',

  components: {
    WsuiHeaderBar
  },

  computed: {
    isHomePath() {
      return this.$route.path === '/home' || this.$route.path === '/home/'
    }
  }
})
</script>
