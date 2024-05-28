<template>
  <div class="ttui-filter-tabs__container">
    <span
        :key="idx"
        v-for="(keyName, idx) in usedFilters"
        class="tag is-white is-medium mb-2 mr-2"
    >
      <span class="pt-1">
        <strong style="text-transform: capitalize;" class="mr-1">
          {{ tabNames[keyName] }}:
        </strong>
        {{ getValuesTab(keyName) }}
      </span>
      <button class="delete" @click="$emit('delete', keyName)" />
    </span>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { dateformat } from '@/constants/common';
import { defineComponent } from 'vue'

export default defineComponent({
  name:'tt-ui-filters-tabs',

  props: {
    data: { type: Object, default: () => ({}) },
    filters: { type: Object, default: () => ({}) },
    tabNames: { type: Object, default: () => ({}) },
  },

  computed: {
    keyNames() { return Object.keys(this.tabNames); },
    usedFilters() {
      const visibleTabsFilter = [];
      for (let i = 0; i < this.keyNames.length; i += 1) {
        if (
            (
                this.data[this.keyNames[i]]
                && this.data[this.keyNames[i]].options
                && this.isNotEmpty(this.filters[this.keyNames[i]])
            )
            || (
                !this.data[this.keyNames[i]]
                && this.filters[this.keyNames[i]]
            )
        ) {
          if(this.isNotEmpty(this.filters[this.keyNames[i]])) {
            visibleTabsFilter.push(this.keyNames[i]);
          }
        }
      }
      return visibleTabsFilter;
    },
  },
  methods: {
    getValuesTab(key) {
      if (this.data[key]) {
        const result = this.data[key].options.filter((val) => {
          if (Array.isArray(this.filters[key])) {
            return this.filters[key].includes(val[key]);
          }

          if(val[key]) {
            return this.filters[key] === val[key];
          } else {
            return this.filters[key] === val[this.data[key].idField];
          }
        }).map((x) => x[this.data[key].fieldName]).join(', ');

        if(/^\d+$/.test(result)) {
          return parseInt(result);
        } else {
          return result;
        }

      }

      const isValidDate = moment(this.filters[key], dateformat.BACK_DEFAULT, true).isValid()
          || moment(this.filters[key], dateformat.BACK_DATE_TIME, true).isValid();

      return isValidDate
          ? moment(this.filters[key]).format(dateformat.DEFAULT)
          : this.filters[key];
    },

    isNotEmpty(value) {
      if (value !== null && value !== undefined) {
        if (typeof value === 'string' && value.trim() !== '') {
          return true;
        }

        if (Array.isArray(value)) {
          return value.length > 0;
        }

        return true;
      }
      return false;
    },
  },
});
</script>
