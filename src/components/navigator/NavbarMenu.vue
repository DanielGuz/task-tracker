<template>
  <nav class="navbar ttui-navbar__container" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <tt-ui-breadcrumb />
      </div>

      <div class="navbar-end">
        <!-- Menu User -->
        <div class="navbar-item ttui-navbar__avatar">
          <b-dropdown trap-focus aria-role="menu" position="is-bottom-left">
            <template #trigger>
              <div class="ttui-navbar__avatar--item">
                <div class="company-img__container">
                  <img alt="Logo Empresa" src="http://" @error="setCompanyDefaultImg($event)" />
                </div>
                <div class="avatar-img__container">
                  <img
                    :src="userPhoto"
                    class="avatar-img"
                    :alt="user.username || 'Usuario'"
                    @error="setUserDefaultImg($event, user)"
                  />
                </div>
              </div>
            </template>
            <b-dropdown-item aria-role="listitem" @click="logOutUser">
              Cerrar sesión
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import TtUiBreadcrumb from './Breadcrumb.vue'
import sessionHelper from '@/helpers/session'
import { defineComponent } from 'vue'
import { useAuthentication } from '@/stores/authentication'
import { useNavigator } from '@/stores/navigator'
import defaultImgCompany from '@/assets/images/logo.png'
import defaultImgUserMale from '@/assets/images/male_avatar.png'
import defaultImgUserFemale from '@/assets/images/female_avatar.png'

export default defineComponent({
  setup() {
    const authentication = useAuthentication()
    const navigator = useNavigator()

    return { authentication, navigator }
  },

  computed: {
    user() {
      return this.authentication.user
    },

    userPhoto() {
      return this.authentication.getUserUrlPhoto
    }
  },

  components: {
    TtUiBreadcrumb
  },

  methods: {
    setCompanyDefaultImg(event) {
      event.target.src = defaultImgCompany
    },

    setUserDefaultImg(event, data) {
      event.target.src = Number(data.genero) === 1 ? defaultImgUserFemale : defaultImgUserMale
    },

    logOutUser() {
      this.authentication.resetState()
      this.navigator.resetState()
      sessionHelper.logoutSession()
      this.$router.push('/login')
    }
  }
})
</script>
