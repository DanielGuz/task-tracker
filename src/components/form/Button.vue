<template>
  <b-button
      icon-pack="fas"
      :icon-left="icon"
      class="ttui-button is-responsive"
      :native-type="submit ? 'submit' : 'button'"
      :rounded=rounded
      :expanded=expanded
      :size="size"
      :class="{
      'is-info': info,
      'is-error': error,
      'is-success': success || primary,
      'is-warning': warning,
      'is-danger': danger,
      'is-light': light,
    }"
  >
    <div class="ttui-button__counter" v-if="showCount"> {{ count }} </div>
    <slot />
  </b-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-button',

  props: {
    icon: { type: String, default: () => '' },
    count: { type: Number, default: () => 0 },
    info: { type: Boolean, default: () => false },
    error: { type: Boolean, default: () => false },
    success: { type: Boolean, default: () => false },
    warning: { type: Boolean, default: () => false },
    danger: { type: Boolean, default: () => false },
    light: { type: Boolean, default: () => false },
    primary: { type: Boolean, default: () => false },
    submit: { type: Boolean, default: () => false },
    rounded: { type: Boolean, default: () => false },
    expanded: { type: Boolean, default: () => false },
    size: { type: String, default: () => '' },
    showCount: { type: Boolean, default: () => false },
  },

  methods: {
    onClick(ev) { this.$emit('click', ev); },
  }
});
</script>
