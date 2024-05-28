<template>
  <b-dropdown
      aria-role="list"
      v-model="dataModel"
      :disabled="disabled"
      :multiple="multiple"
      :position="position"
      :max-height="maxHeight"
      :scrollable="scrollable"
      :append-to-body="appendToBody"
      class="ttui-selector is-block"
  >
    <template v-slot:trigger>
      <b-input
          readonly
          icon-right="angle-down"
          class="ttui-selector__input"
          :modelValue="valueByMultipleOption"
          :class="{ 'ttui-selector__input--placeholder': valueByMultipleOption === placeholder }"
      />
    </template>
    <b-dropdown-item
        :key="option[keyOpt]"
        aria-role="listitem"
        :modelValue="option[keyOpt]"
        v-for="option in options"
    >
      <span>{{ option[nameOpt] }}</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tt-ui-selector',

  data() {
    return {
      dataModel: [],
    };
  },

  props: {
    scrollable: { type: Boolean, default: () => false },
    appendToBody: { type: Boolean, default: () => false },
    keyOpt: { type: String, required: true },
    nameOpt: { type: String, required: true },
    options: { type: Array, default: () => [] },
    maxHeight: { type: Number, default: () => 200 },
    disabled: { type: Boolean, default: () => false },
    multiple: { type: Boolean, default: () => false },
    visibleOptions: { type: Number, default: () => 3 },
    value: { type: [Array, String, Number], default: () => [] },
    position: { types: String, default: () => 'is-bottom-right' },
    placeholder: { type: String, default: () => 'Seleccione una opción' }
  },

  watch: {
    dataModel(val) { this.$emit('input', val); },
    value(val) {
      if (JSON.stringify(this.dataModel) !== JSON.stringify(val)) this.dataModel = val;
    },
  },

  computed: {
    valueByMultipleOption() {
      if (this.multiple) {
        const values = this.options.filter((x) => (
            this.dataModel.includes(x[this.keyOpt])
        ))
            .map((x) => x[this.nameOpt]);
        return this.dataModel.length > this.visibleOptions
            ? `Seleccionados: ${this.dataModel.length}`
            : values.join(',');
      }

      const result = this.options.filter((x) => x[this.keyOpt] === this.dataModel);
      return result && result.length ? result[0][this.nameOpt] : this.placeholder ;
    },
  },

  mounted() { this.dataModel = this.value; },
});
</script>
