<template>
  <div class="ttui-breadcrumb__container">
    <div class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li
          :key="idx"
          @click="goTo(item)"
          v-for="(item, idx) in breadList"
          :class="{ 'ttui-breadcrumb__link': !!item.nameRouter }"
        >
          <span v-if="item.name == 'Inicio'" class="icon">
            <b-icon pack="fas" icon="home"> </b-icon>
          </span>
          <span v-else>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-breadcrumb',
  computed: {
    breadList() {
      let breadcrumb = this.$route.meta.breadcrumb
      if (breadcrumb && breadcrumb.length > 4) {
        breadcrumb = [...breadcrumb.slice(0, 3), { name: '...' }, breadcrumb[breadcrumb.length - 1]]
      }
      return breadcrumb
    }
  },
  methods: {
    goTo(option) {
      if (option?.nameRouter) {
        this.$router
          .push({ name: option.nameRouter })
          .catch(() => console.warn('Prevent same router'))
      }
    }
  }
})
</script>
