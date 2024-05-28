import { defineStore } from 'pinia'
import { NotificationProgrammatic as Notification } from 'buefy'

export const useNotification = defineStore('notification', {
  state: () => ({
    data: {}
  }),

  getters: {},
  actions: {
    showMessage(data: any) {
      Notification.open(data)
    }
  }
})
