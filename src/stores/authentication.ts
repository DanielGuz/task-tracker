import { defineStore } from 'pinia'
import defaultUserPhoto from '@/assets/images/male_avatar.png'
import { jwtDecode } from 'jwt-decode'

export const useAuthentication = defineStore('authentication', {
  state: () => ({
    globalPropierties: <any>{},
    token: <string>'',
    user: <any>{}
  }),

  getters: {
    getUserUrlPhoto(state) {
      if (state.user && state.user.foto) {
        return state.user.foto
      }

      return defaultUserPhoto
    }
  },

  actions: {
    setUser(payload: any) {
      this.user = payload
    },

    setToken(payload: any) {
      this.token = payload
    },

    setGlobalPropierties(payload: any) {
      this.globalPropierties = payload
    },

    setState() {
      this.user = {}
      this.token = ''
      this.globalPropierties = {}
    },

    getLocalStorageData() {
      try {
        if (!this.token) {
          this.updateToken(window.localStorage.getItem('_token'))
        }
        return this.token
      } catch {
        console.warn('Cannot get localStorage _token data')
        return null
      }
    },

    getUserToken() {
      try {
        return jwtDecode<any>(this.getLocalStorageData())
      } catch {
        console.warn('Cannot find token data')
        return null
      }
    },

    getExpirationSession() {
      try {
        return this.getUserToken()?.exp
      } catch {
        return null
      }
    },

    isExpiredSession() {
      try {
        const exp = this.getExpirationSession()
        if (exp) {
          return new Date(exp * 1000) < new Date()
        }
      } catch {
        return true
      }

      return true
    },

    getUserRoles() {
      try {
        return this.getUserToken()?.rol
      } catch {
        return null
      }
    },

    isLoggedUser() {
      return !this.isExpiredSession()
    },

    updateToken(payload: any) {
      window.localStorage.setItem('_token', payload)
      this.setToken(payload)
    },

    updateUser(payload: any) {
      this.setUser(payload)
    },

    updateGlobalPropierties(payload: any) {
      this.setGlobalPropierties(payload)
    },

    resetState() {
      this.setState()
    }
  }
})
