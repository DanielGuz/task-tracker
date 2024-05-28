<template>
  <div :class="estilo" class="mb-5">
    <b-table
        v-if="!resetTable"

        hoverable
        :loading="loading"
        :data="dataTableAsync"
        :sticky-header="stickyHeader"

        @sort="onSort"
        @page-change="onPageChange"

        backend-pagination
        :per-page="records"
        :total="totalRecords"
        :paginated="paginated"
        pagination-size="small"
        pagination-order="is-centered"
        :pagination-simple="paginationSimple"
        :pagination-rounded="paginationRounded"

        aria-page-label="Page"
        aria-current-label="Pagina Actual"
        aria-next-label="Pagina Siguiente"
        aria-previous-label="Pagina Previa"

        backend-sorting
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        :default-sort-direction="defaultsortorder"
        :default-sort="[sortField, defaultsortorder]"
    >
      <b-table-column
          width="80"
          v-if="actions"
          v-slot="props"
          label="Acciones"
      >
        <div style="width: 100%" class="is-flex is-justify-content-center is-align-items-center">
          <div v-if="counter" class="mr-2">{{ props.index + 1 }}</div>
          <b-dropdown aria-role="list" position="is-bottom-right" >
            <template v-slot:trigger>
              <tt-ui-button icon="ellipsis-v" />
            </template>
            <b-dropdown-item
                :key="idx"
                scrollable
                :separator="option.separator"
                append-to-body
                aria-role="listitem"
                v-for="(option, idx) in actionbuttons"
                @click="$emit(option.event, props.row)"
                :disabled="
                typeof option.disabled === 'boolean'
                  ? option.disabled
                  : option.disabled(props.row)
              "
            >{{ option.label }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-table-column>
      <b-table-column
          :key="index"
          v-slot="props"
          :field="column.field"
          :label="column.label"
          :width="column.width"
          :visible="column.visible"
          :numeric="column.numeric"
          :sortable="column.sortable"
          :centered="column.centered"
          v-for="(column, index) in columns"
      >
        <template v-if="column.statusField">
          <tt-ui-status-bar :label="props.row[column.descriptionField]? props.row[column.descriptionField]: props.row[column.field] " :status="props.row[column.colorField? column.colorField:'color_label']"/>
        </template>
        <template v-else>
          <div v-if="column.date">
            {{ getDateFormat(props.row, column) }}
          </div>
          <div v-else-if="column.diffDate">
            {{ getDateDiff(props.row, column) }}
          </div>
          <div
              style="
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
            "
              v-else-if="column.limit"
          >
            {{ props.row[column.field] }}
          </div>
          <div v-else-if="column.numberField" :style="{ 'width': `${column.width}px` }">
            {{ formatNumber(props.row[column.field]) }}
          </div>
          <div v-else :style="{ 'width': `${column.width}px` }">
            {{ props.row[column.field] }}
          </div>
        </template>
      </b-table-column>

      <template v-slot:bottom-left>
        <tt-ui-selector
            scrollable
            placeholder="#"
            key-opt="value"
            name-opt="value"
            v-model="records"
            :max-height="150"
            style="width: 80px"
            :visible-options="1"
            position="is-top-right"
            :options="valuesPerPage"
        />
      </template>
      <template v-slot:empty>
        <div class="content has-text-grey has-text-centered">
          <b-icon icon="info-circle" size="is-large" />
          <p>No se encontraron datos.</p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { diffDateMixin, formatDateMixin } from '@/mixins/form';
import { formUtils } from '@/helpers/formUtilities';
import { defineComponent } from 'vue'
import TtUiButton from "@/components/form/Button.vue";
import TtUiStatusBar from "@/components/visualization/StatusBar.vue";
import TtUiSelector from "@/components/form/Selector.vue";

export default defineComponent({
  name: "tt-ui-data-table",
  components: {TtUiSelector, TtUiStatusBar, TtUiButton},

  data() {
    return {
      page: 1,
      records: 15,
      resetTable: false,
      dataTableAsync: [],
      stickyHeader: false,
      sortIcon: "chevron-up",
      sortIconSize: "is-small",
      valuesPerPage: [...Array(20).keys()].map((i) => ({ value: (i + 1) * 5 } )),
    };
  },

  props: {
    titulo: { type: String, default: "" },
    loading:{ type: Boolean, required: true },
    actions: { type: Boolean, required: true },
    sortField: { type: String, required: true },
    paginated: { type: Boolean, default: true },
    totalRecords: { type: Number, required: true },
    counter: { type: Boolean, default: () => true },
    actionbuttons: { type: Array, default: () => [] },
    estilo: { type: String, default: "websafiTable" },
    defaultsortorder: { type: String, required: true },
    recordsPerPage: { type: Number, default: () => 15 },
    paginationSimple: { type: Boolean, default: false },
    paginationRounded: { type: Boolean, default: false },
    outputDateFormat: { type: String, default: "DD/MM/YYYY", },
    columns: { type: Array, required: true, default: () => [] },
    tableData: { type: Array, required: true, default: () => [] },
  },

  watch: {
    columns() {
      this.resetTable = true;
      this.dataTableAsync = [];
      setTimeout(() => { this.resetTable = false; }, 50);
    },

    tableData(newVal) { this.dataTableAsync = newVal; },
    recordsPerPage(newVal) { this.records = newVal;},

    records(newVal, oldValue) {
      if (newVal !== oldValue) {
        this.$emit('changeRecordsPerPage', newVal);
      }
    },
  },

  mixins: [formatDateMixin, diffDateMixin],

  methods: {
    formatNumber(number) { return formUtils.formatNumber(number); },

    onPageChange(page) { this.$emit("pageChange", { page }); },

    onSort(field, order) {
      this.$emit("sort", { field, order });
    },

    getDateFormat(row, column) {
      const { field, time } = column;
      const date = time ? `${row[field]} ${row[time]}` : row[field];
      if(date != null) {
        return this.formatDate(date, !!time);
      } else {
        return "";
      }
    },

    getDateDiff(row, column) {
      const { lDateIni, lDateEnd, lTimeIni, lTimeEnd } = column;
      const dateIni = lTimeIni ? `${row[lDateIni]} ${row[lTimeIni]}` : row[lDateIni];
      const dateEnd = lTimeEnd ? `${row[lDateEnd]} ${row[lTimeEnd]}` : row[lDateEnd];
      return this.diffBeetweenDates(dateIni, dateEnd, 'days');
    },
  },
});
</script>
