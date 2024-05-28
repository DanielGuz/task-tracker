<template>
  <div class="ttui-bar__summary-information is-justify-content-space-between">
    <div class="summary-information__item">
      <strong>Menu</strong> <span>{{ moduleName }}</span>
    </div>
    <div class="summary-information__item has-text-right">
      <strong>Fecha proceso</strong> <span>{{ formatDate(new Date()) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { formatDateMixin } from '@/mixins/form'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-summary',

  mixins: [formatDateMixin],

  computed: {
    moduleName() {
      if (this.$route.meta.breadcrumb) {
        return this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].name
      }
      return ''
    }
  }
})
</script>
