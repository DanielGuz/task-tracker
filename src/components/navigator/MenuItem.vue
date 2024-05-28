<template>
  <div class="ttui-menu-item__container">
    <b-collapse
      :key="idx"
      animation="slide"
      @open="isOpen = idx"
      :open="isOpen == idx"
      v-for="(option, idx) of data"
    >
      <template #trigger="props">
        <div class="ttui-menu-item__container" role="button">
          <div
            @click="goTo(option)"
            :class="{
              'ttui-menu-item__link': level === 2,
              'ttui-menu-item__header': level === 0,
              'ttui-menu-item__subheader': level === 1
            }"
          >
            <div class="pt-1">{{ nameWithoutUnderscore(option.nombre) }}</div>
            <b-icon
              v-if="!option.comando && !option.direccion"
              :icon="props.open ? 'angle-up' : 'angle-down'"
              size="is-small"
              class="pt-4 ml-4"
            />
          </div>
        </div>
      </template>
      <div class="item__container-child" v-if="option.hijo && option.hijo.length > 0">
        <tt-ui-menu-item :data="option.hijo" :level="level + 1" />
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNavigator } from '@/stores/navigator'

export default defineComponent({
  name: 'tt-ui-menu-item',

  setup() {
    const navigator = useNavigator()

    return { navigator }
  },

  data() {
    return {
      isOpen: null
    }
  },

  props: {
    level: { type: Number, default: () => 0 },
    data: { type: [Array, Object], default: () => [] }
  },

  computed: {
    moduleId() {
      return this.navigator.moduleId
    }
  },

  methods: {
    goTo(option: any) {
      const moduleId = option?.id_mod ? option?.id_mod : this.moduleId
      if (option.direccion || option.comando) {
        let nameRouter = ''
        let params = { moduleId }
        if (option.comando) nameRouter = option.comando
        if (option.direccion && !option.comando) {
          if (option.id_tipo_carga === 1) {
            nameRouter = option.direccion
          }
        }

        this.$router.push({ name: nameRouter, params })
        // Todo .catch(() => { console.warn('Same redirect path.'); });
        this.navigator.toggleMenu(false)
      }
    },

    nameWithoutUnderscore(name) {
      return this.titleCase(name.split('_').join(' ').toLowerCase())
    },

    titleCase(str) {
      const splitStr = str.toLowerCase().split(' ')
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    }
  }
})
</script>
