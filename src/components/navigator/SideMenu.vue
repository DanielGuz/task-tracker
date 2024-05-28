<template>
  <div class="ttui-sidebar--menu">
    <div class="ttui-sidebar--list">
      <ul class="ttui-sidebar--items">
        <router-link class="ttui-sidebar--logo" :to="{ path: '/dashboard' }">
          <span>Task Tracker</span>
        </router-link>
        <li
          :key="idx"
          @click="toggleMenu(idx)"
          class="ttui-sidebar--item"
          v-for="(option, idx) in menu"
          :class="{
            'ttui-sidebar--item-disabled': option.disabled,
            'ttui-sidebar--item-active': selectedOption === idx
          }"
        >
          <b-tooltip :label="option.name" position="is-right" type="is-dark">
            <b-icon :icon="option.icon" size="is-medium" />
          </b-tooltip>
        </li>
      </ul>
      <tt-ui-side-control-btn />
    </div>
    <div class="ttui-sidebar--container" :class="{ 'ttui-sidebar--container-active': opened }">
      <div class="ttui-sidebar__header-menu">
        <span>{{ selectedOption != null ? menu[selectedOption].name : '' }}</span>
        <button class="delete" @click="toggleMenu(false)" />
      </div>
      <tt-ui-menu-item v-if="selectedOption !== null" :data="menu[selectedOption]?.menu" />
    </div>
    <div
      @click="navigator.toggleMenu()"
      class="ttui-sidebar--backdrop"
      :class="{ 'ttui-sidebar--backdrop-active': opened }"
    ></div>
  </div>
</template>

<script lang="ts">
import TtUiMenuItem from './MenuItem.vue'
import TtUiSideControlBtn from './SideControlBtn.vue'
import { defineComponent } from 'vue'
import { useNavigator } from '@/stores/navigator'

export default defineComponent({
  name: 'tt-ui-side-menu',

  setup() {
    const navigator = useNavigator()

    return { navigator }
  },

  data() {
    return {
      menuKeys: [],
      selectedOption: null
    }
  },

  components: {
    TtUiMenuItem,
    TtUiSideControlBtn
  },

  computed: {
    menu() {
      return this.navigator.menu
    },

    opened() {
      return this.navigator.opened
    }
  },

  watch: {
    menu() {
      this.getMenuKeys()
    }
  },

  methods: {
    toggleMenu(option) {
      console.log(option)
      if (!this.menu[option].disabled) {
        if (this.opened) {
          if (this.selectedOption !== option) this.selectedOption = option
          else this.navigator.toggleMenu()
          if (this.menu[option].comando) {
            this.navigator.toggleMenu(false)
            this.$router.push({ name: this.menu[option].comando }).catch(() => {
              console.warn('Same redirect path.')
            })
          }
        } else {
          this.selectedOption = option
          if (!this.menu[option].comando) this.navigator.toggleMenu()
          this.$router.push({ name: this.menu[option].comando }).catch(() => {
            console.warn('Same redirect path.')
          })
        }
      }
    },
    getMenuKeys() {
      this.menuKeys = Object.keys(this.menu)
    }
  },

  mounted() {
    this.getMenuKeys()
    this.navigator.toggleMenu(false)
  }
})
</script>
