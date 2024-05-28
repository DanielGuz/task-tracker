import { createRouter, createWebHashHistory } from 'vue-router'

import sessionHelper from '@/helpers/session'
import { menu } from '@/helpers/menu'
import { getCoreRoutes } from '@/router/modules/core'
import { useNavigator } from '@/stores/navigator'
import { useAuthentication } from '@/stores/authentication'

const baseRoutes: any[] = []
const routes = baseRoutes.concat(getCoreRoutes())

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to) => {
  const navigator = useNavigator()
  const authentication = useAuthentication()

  navigator.setLoadingRouterPage(true)
  window.document.title =
    to.meta && to.meta.breadcrumb ? to.meta.breadcrumb.at(-1).name : 'Task Tracker'

  if (to.name === 'Login' || to.path === '/login' || to.path === '/') {
    if (!authentication.isExpiredSession()) {
      if (to.path !== '/dashboard') {
        return '/dashboard'
      }
    }
  }

  if (!to.meta?.isPublicPath) {
    const validAuth = await middlewareAuthentication(navigator)

    if (!validAuth) {
      return '/login'
    }

    if (typeof validAuth === 'string') {
      navigator.setLoadingRouterPage(false)
      return validAuth
    }
  }
})

router.afterEach(() => {
  const navigator = useNavigator()
  navigator.setLoadingRouterPage(false)
})

const configureUserTheme = (theme: any) => {
  document.body.setAttribute('data-theme', theme || 'default')
}

const middlewareAuthentication = async (navigator: any) => {
  const authentication = useAuthentication()

  const wsToken = authentication.token

  const decryptJWT = authentication.getUserToken()
  const wsUserData = decryptJWT?.user

  if (authentication.isExpiredSession()) {
    sessionHelper.logoutSession()
    navigator.resetState()
    authentication.resetState()
    return false
  }

  if (decryptJWT) {
    configureUserTheme(decryptJWT.tema)
  }

  authentication.updateToken(wsToken)
  authentication.updateUser(wsUserData)

  const stateMenu = navigator.menu

  navigator.updateMenu(
    {
      ...menu,
      ...stateMenu,
      0: {
        ...menu[0],
        ...stateMenu[0]
      }
    },
    null,
    {}
  )

  return true
}

export default router
