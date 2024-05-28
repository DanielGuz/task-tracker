<template>
  <div @click="toggleSideBar()" class="ttui-sidebar--control">
    <b-icon :icon="icon" size="is-small" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNavigator } from '@/stores/navigator'

export default defineComponent({
  name: 'tt-ui-side-control-btn',

  setup() {
    const navigator = useNavigator()

    return { navigator }
  },

  computed: {
    icon() {
      return this.navigator.getIconByExpanded
    }
  },

  methods: {
    toggleSideBar() {
      return this.navigator.toggleExpanded()
    }
  }
})
</script>
