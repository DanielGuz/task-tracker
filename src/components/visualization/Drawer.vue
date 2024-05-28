<template>
  <div class="ttui-drawer">
    <transition
        :name="
        size === 'small'
          ? 'right-fade-small-in-transition'
          : 'right-fade-in-transition'
      "
    >
      <div
          v-show="dataTable.showFilters"
          class="ttui-drawer__container"
          :class="{
          'ttui-drawer__container--active': dataTable.showFilters,
          'ttui-drawer__container--small': size === 'small',
        }"
      >
        <div class="ttui-drawer__header is-flex is-justify-content-space-between">
          <div class="title is-5 mb-0">{{ title }}</div>
          <div class="close">
            <button
                class="delete"
                @click="dataTable.toggleFilterDrawer(false);"
            ></button>
          </div>
        </div>
        <div class="ttui-drawer__body">
          <slot name="body"/>
        </div>
        <div class="ttui-drawer__footer">
          <div class="ttui-drawer__footer-left">
            <slot name="footer-left"/>
          </div>
          <div class="ttui-drawer__footer-right">
            <slot name="footer-right"/>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade-transition-4">
      <div
          v-if="dataTable.showFilters"
          :class="['ttui-drawer__backdrop']"
          @click="dataTable.toggleFilterDrawer(false);"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDataTable } from '@/stores/dataTable'

export default defineComponent({
  name: 'tt-ui-drawer',

  setup() {
    const dataTable = useDataTable();

    return { dataTable };
  },

  props: {
    size: { type: String, default: () => '' },
    title: { type: String, default: () => '' },
    value: { type: Boolean, default: () => false },
  },

  methods: {
    initialization() {
      const finalParent = document?.getElementsByTagName('body')[0];
      finalParent.append(this.$el);
    },
  },

  mounted() {
    this.initialization();
  },
});
</script>