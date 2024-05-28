<template>
  <div class="ttui-title">
    <slot />
    <div class="ttui-title__subtitle">
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-title',
});
</script>

