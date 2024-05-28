<template>
  <section id="login" class="hero is-fullheight">
    <div class="hero-head">
      <div class="columns is-vcentered is-desktop px-6">
        <div class="column">
          <h3 class="has-text-black is-marginless">Task Tracker</h3>
        </div>
        <div class="column is-2 p-5">
          <figure class="image is-24x24" style="float: right">
            <img alt="Logo ERP" src="@/assets/images/logo.png" />
          </figure>
        </div>
      </div>
    </div>
    <hr class="my-1" />
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-5 is-offset-3">
          <p class="subtitle has-text-black">{{ title }}</p>
          <p class="mb-2" v-if="message">{{ message }}</p>
          <div class="box form-container">
            <login-form @login="validateLogin" v-if="showLoginForm" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotification } from '@/stores/notification'
import { useAuthentication } from '@/stores/authentication'
//import axios from 'axios';
//import { CONFIG } from '@/app-config';
import { NotificationProgrammatic } from 'buefy'
import sessionHelper from '@/helpers/session'
import LoginForm from '../components/login/LoginForm.vue'

export default defineComponent({
  setup() {
    const notification = useNotification()
    const authentication = useAuthentication()

    return { notification, authentication }
  },

  name: 'login-view',

  data() {
    return {
      values: [],
      message: 'Ingrese sus credenciales',
      credentials: {},
      title: 'Inicio de sesión al sistema',
      showLoginForm: true
    }
  },

  components: {
    LoginForm
  },

  methods: {
    validateUser(data: any) {
      // return axios.post(CONFIG.ENDPOINT.VALIDATE_DB_USER, data)
      //     .then((res) => res.data)
      //     .catch((err) => {
      //       console.error('Cannot LogIn session');
      //       const responseData = err.response.data;
      //       NotificationProgrammatic.open({
      //         duration: 54000,
      //         message: responseData.data.message,
      //         hasIcon: true,
      //         icon: 'plus',
      //         type: "is-warning",
      //         queue: true,
      //       });
      //     });

      return new Promise((resolve) => {
        resolve(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjI3MTY4NTY0OTksImV4cCI6MjcxNjg1ODI5OSwidXNlcm5hbWUiOiJ1c2VyIiwidXNlciI6eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWRfdGlwb19kb2MiOjEsIm51bV9kb2MiOiIxMjM0NTYiLCJub21icmUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXN0YWRvIjoxLCJmb3RvIjpudWxsLCJnZW5lcm8iOjF9fQ.hIwUHcY04_UCV0VWCpfMdOicAHEuS4-cCpmD3k6EYDI'
        )
      })
    },

    validateRoleUser() {
      if (this.authentication.getUserRoles() === 'ENTIDAD') {
        sessionHelper.logoutSession()

        NotificationProgrammatic.open({
          duration: 4000,
          message: 'El Usuario no tiene permisos para ingresar',
          hasIcon: true,
          type: 'is-danger',
          queue: true
        })

        throw new Error('El Usuario no tiene permisos para ingresar')
      }
    },

    validateLogin(values) {
      const params = { ...values, ...this.credentials }
      const loadingPage = this.$buefy.loading.open()
      this.validateUser(params)
        .then((res) => {
          this.handleUserRedirect(res)
        })
        .catch(() => {
          this.notification.showMessage({
            title: 'Error',
            type: 'is-danger',
            message: 'A ocurrido un error.',
            hasIcon: true,
            queue: true
          })
        })
        .finally(() => loadingPage.close())
    },

    async handleUserRedirect(res) {
      this.showLoginForm = true

      const token = res //res.data.token

      await this.authentication.updateToken(token)
      // this.validateRoleUser();

      this.message = 'Dirigiendo al inicio'
      this.title = 'Usuario autenticado'
      this.$router.push({ name: 'task-tracker.home' })
    }
  }
})
</script>

<style lang="scss" scoped>
.form-container {
  &.transition {
    .form-bar {
      right: 35%;
    }
  }
}
</style>
