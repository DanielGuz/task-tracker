import { defineStore } from 'pinia'

export const useNavigator = defineStore('navigator', {
  state: () => ({
    currentModule: {},
    expanded: <boolean>true,
    loadingRouter: <boolean>false,
    menu: <any[]>[],
    moduleId: null,
    opened: <boolean>false
  }),

  getters: {
    getIconByExpanded(state) {
      return state.expanded ? 'angle-left' : 'angle-right'
    }
  },

  actions: {
    setMenu(payload: any) {
      this.menu = payload
    },

    setOpened(payload: any) {
      this.opened = payload
    },

    setSetModuleId(payload: any) {
      this.moduleId = payload
    },

    setExpanded(payload: any) {
      this.expanded = payload
    },

    setModuleData(payload: any) {
      this.currentModule = payload
    },

    setLoadingRouterPage(payload: any) {
      this.loadingRouter = payload
    },

    setState() {
      this.menu = []
      this.opened = false
      this.expanded = true
      this.moduleId = null
      this.currentModule = {}
      this.loadingRouter = false
    },

    updateMenu(moduleMenu: any, moduleId: any, currentModuleDate: any) {
      this.setMenu(moduleMenu)
      this.setSetModuleId(moduleId)
      this.setModuleData(currentModuleDate)
    },

    toggleMenu(payload: any) {
      this.setOpened(typeof payload === 'boolean' ? payload : !this.opened)
    },

    toggleExpanded() {
      this.setOpened(false)
      this.setExpanded(!this.expanded)
    },

    toggleLoadingRouterPage(payload: any) {
      this.setLoadingRouterPage(payload)
    },

    resetState() {
      this.setState()
    }
  }
})
