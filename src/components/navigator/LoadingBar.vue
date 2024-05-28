<template>
  <div class="ttui-loading-router" v-show="show">
    <div class="ttui-loading-router__inner" :style="styles"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNavigator } from '@/stores/navigator'

let loadingInterval = 0

export default defineComponent({
  setup() {
    const navigator = useNavigator()
    return { navigator }
  },

  data() {
    return {
      percent: 0,
      show: false,
      status: 'success'
    }
  },

  watch: {
    loadingRouter(val) {
      if (val) this.start()
      else this.stop()
    }
  },

  computed: {
    loadingRouter() {
      return this.navigator.loadingRouter
    },

    styles() {
      return { width: `${this.percent}%` }
    }
  },

  methods: {
    showProgress(show) {
      this.show = show
    },
    start() {
      this.showProgress(true)
      this.percent = 0

      loadingInterval = setInterval(() => {
        this.percent += 10
      }, 200)
    },
    stop() {
      clearInterval(loadingInterval)
      this.percent = 100

      setTimeout(() => {
        this.showProgress(false)
      }, 600)
    }
  }
})
</script>
