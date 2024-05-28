<template>
  <div
    id="app"
    class="ttui-main__container"
    :class="{ 'ttui-main__container-close': !navigator.expanded }"
  >
    <tt-ui-loading-bar />

    <div class="ttui-main__container-login" v-if="!isLoggedUser">
      <router-view />
    </div>

    <div class="ttui-main__container-app" v-if="isLoggedUser">
      <tt-ui-navbar-menu />
      <tt-ui-summary />
      <tt-ui-side-menu />
      <div class="ttui-main__content">
        <router-view />
      </div>
    </div>

    <tt-ui-footer-menu />
  </div>
</template>

<script lang="ts">
import TtUiLoadingBar from '@/components/navigator/LoadingBar.vue'
import TtUiNavbarMenu from '@/components/navigator/NavbarMenu.vue'
import TtUiSummary from '@/components/navigator/Summary.vue'
import TtUiSideMenu from '@/components/navigator/SideMenu.vue'
import TtUiFooterMenu from '@/components/navigator/FooterMenu.vue'
import { defineComponent } from 'vue'
import { useNavigator } from '@/stores/navigator'
import { useAuthentication } from '@/stores/authentication'

export default defineComponent({
  name: 'app',

  setup() {
    const authentication = useAuthentication()
    const navigator = useNavigator()

    return { authentication, navigator }
  },

  components: {
    TtUiLoadingBar,
    TtUiNavbarMenu,
    TtUiSummary,
    TtUiSideMenu,
    TtUiFooterMenu
  },

  computed: {
    isLoggedUser() {
      return this.authentication.isLoggedUser()
    }
  }
})
</script>
