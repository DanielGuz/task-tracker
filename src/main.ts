import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Buefy from 'buefy'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { BuefyConfig } from 'buefy/src/types/components'

library.add(fas)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

const buefyConfig: BuefyConfig = {
  defaultImageLazy: true,
  defaultNotificationDuration: 4000,
  defaultIconPack: 'fas',
  defaultIconComponent: 'font-awesome-icon',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x'
      }
    }
  }
}

app.use(Buefy, buefyConfig)

app.mount('#app')
