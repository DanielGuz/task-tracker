<template>
  <div
      class="ttui-form__container hero"
      :class="{
      'ttui-form__container--simple': (!double && !full) || simple,
      'ttui-form__container--full': full,
      'ttui-form__container--double': double,
      'ttui-form__container--auto-height': autoHeight,
    }"
  >
    <div class="ttui-form__simple-column" v-if="(!double && !full) || simple || full">
      <slot></slot>
    </div>
    <div class="ttui-form__double-column columns m-0" v-else>
      <div class="column" v-if="showColumnLeft" :class="classWidthColumnLeft" :style="styleWidthColumnLeft">
        <slot name="column-left"></slot>
      </div>
      <div class="column" v-if="showColumnRight" :class="classWidthColumnRight" :style="styleWidthColumnRight">
        <slot name="column-right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-form-container',

  props: {
    simple: {type: Boolean, default: () => false},
    double: {type: Boolean, default: () => false},
    full: {type: Boolean, default: () => false},
    autoHeight: {type: Boolean, default: () => false},
    classWidthColumnLeft: {type: String, default: () => ''},
    classWidthColumnRight: {type: String, default: () => ''},
    styleWidthColumnLeft: {type: String, default: () => ''},
    styleWidthColumnRight: {type: String, default: () => ''},
    showColumnRight: {type: Boolean, default: () => true},
    showColumnLeft: {type: Boolean, default: () => true},
  },
});
</script>
