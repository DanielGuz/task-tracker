<template>
  <div
      class="ttui-common__divider"
      :style="{ height: pxHeight }"
      :class="{ 'ttui-common__divider--vertical': vertical }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-divider',

  props: {
    pxHeight: { type: String, default: () => '30px' },
    vertical: { type: Boolean, default: () => true },
  },
});
</script>
