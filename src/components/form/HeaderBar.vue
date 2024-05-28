<template>
  <div
    class="ttui-form__header-bar px-5"
    :class="{
      'ttui-form__header-bar--theme': color === 'theme',
      'ttui-form__header-bar--default': color === 'default'
    }"
  >
    <b-tooltip
      :label="this.title"
      position="is-bottom"
      type="is-dark"
      size="is-large"
      :multilined="multilined"
    >
      <div class="header-bar__left is-flex is-align-items-center">
        <tt-ui-status-bar v-if="!!label" :label="label" :status="status" class="mr-3" />
        <div class="header-bar__title title mb-0 is-size-5">
          {{ getShortTitle() }}
          <span class="header-bar__icon" @click="goToHelpPath()" v-if="!isHide">
            <b-icon pack="fas" size="is-small" icon="question-circle" />
          </span>
          <br v-if="subtitle.length > 0" />
          <span v-if="subtitle.length > 0" class="is-size-6">{{ getShortSubtitle() }} </span>
        </div>
      </div>
    </b-tooltip>
    <div class="header-bar__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import TtUiStatusBar from '@/components/visualization/StatusBar.vue'
import { formUtils } from '@/helpers/formUtilities'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-header-bar',

  data() {
    return {
      baseURL: '#'
    }
  },

  components: {
    TtUiStatusBar
  },

  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: () => '' },
    label: { type: String, default: () => '' },
    isHide: { type: Boolean, default: () => false },
    color: { type: String, default: () => 'default' },
    status: { type: String, default: () => 'default' },
    titleLength: { type: Number, default: 65 }
  },

  methods: {
    goToHelpPath() {
      let redirectUrl = ''
      let splitUrlByTag = ''
      const pathUrl = this.$route.name.split('.').join('/')

      splitUrlByTag = pathUrl.split('_')
      redirectUrl = `${splitUrlByTag[0]}.html`

      if (splitUrlByTag.length > 1) {
        redirectUrl += `#${splitUrlByTag[1]}`
      }

      window.open(`${this.baseURL}${redirectUrl}`, '_blank')
    },
    getShortTitle() {
      return formUtils.shortString(this.title, this.titleLength)
    },
    getShortSubtitle() {
      return formUtils.shortString(this.subtitle, this.titleLength + 20)
    }
  },

  computed: {
    multilined() {
      return this.title.length > this.titleLength
    }
  }
})
</script>
