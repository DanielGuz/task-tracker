<template>
  <div :class="`${this.defaultClass} ${this.classPosition} ${this.classAlignItems} ${this.classJustifyContent}`">
    <div class="mr-1 ttui-summary-label__title">{{ label }}</div>
    <div class="ttui-summary-label__description">{{ formattedDescription }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-summary-label',

  data() {
    return {
      defaultClass: 'mb-2 ttui-summary-label is-flex'
    };
  },

  props: {
    label: {type: String, default: () => ''},
    position: {type: String, default: () => 'column'},
    align_items: {type: String, default: () => ''},
    justify_content: {type: String, default: () => ''},
    description: {type: [String, Number], default: () => '-'},
  },

  computed: {
    formattedDescription() {
      return `${this.description}`;
    },

    classPosition() {
      if (this.position === 'row') {
        return 'is-flex-direction-row is-align-items-center';
      } else if (this.position === 'column') {
        return 'is-flex-direction-column';
      } else {
        return '';
      }
    },

    classAlignItems() {
      if (this.align_items === 'center') {
        return 'is-align-items-center';
      } else if (this.align_items === 'flex-start') {
        return 'is-align-items-flex-start';
      } else if (this.align_items === 'flex-end') {
        return 'is-align-items-flex-end';
      } else {
        return '';
      }
    },

    classJustifyContent() {
      if (this.justify_content === 'center') {
        return 'is-justify-content-center';
      } else if (this.justify_content === 'flex-start') {
        return 'is-justify-content-flex-start';
      } else if (this.justify_content === 'flex-end') {
        return 'is-justify-content-flex-end';
      } else if (this.justify_content === 'space-between') {
        return 'is-justify-content-space-between';
      } else {
        return '';
      }
    }
  },
});
</script>
