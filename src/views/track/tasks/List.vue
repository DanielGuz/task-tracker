<template>
  <section>
    <tt-ui-drawer
        size="small"
        :modelValue="showFilters"
        title="Filtrar resultados"
    >
      <template v-slot:body>

        <b-field label="ID Usuario">
          <b-input
              :modelValue="filters.id_usuario"
              v-on:update:modelValue="updateFiltersAndLabelTab(
              { field: 'id_usuario', value: $event },
              'ID',
            )"
          ></b-input>
        </b-field>

        <b-field label="Usuario">
          <b-input
              :modelValue="filters.usuario"
              v-on:update:modelValue="updateFiltersAndLabelTab(
              { field: 'usuario', value: $event },
              'Usuario',
            )"
          ></b-input>
        </b-field>
      </template>
      <template v-slot:footer-right>
        <tt-ui-button @click="toggleFilters(false)">Cancelar</tt-ui-button>
        <tt-ui-button
            success
            class="ml-2"
            @click="fetchData(fetchPayload); toggleFilters(false)"
        >Buscar</tt-ui-button>
      </template>

      <template v-slot:footer-left>
        <tt-ui-button @click="clearDataFilters()">Limpiar</tt-ui-button>
      </template>
    </tt-ui-drawer>

    <tt-ui-header-bar title="Tareas">
      <template v-slot:actions>
        <div class="is-flex is-align-items-center">
          <tt-ui-button class="mr-2" icon="redo" @click="fetchData(fetchPayload)" />
          <b-tooltip label="Filtros" position="is-left" type="is-dark">
            <tt-ui-button
                show-count
                icon="filter"
                :count="filterCounter"
                @click="toggleFilters(true)"
            />
          </b-tooltip>
          <tt-ui-divider vertical class="mx-3" />
          <tt-ui-button
              class="mr-2"
              @click="$router.push({ name: 'task-tracker.home' })"
          >Volver</tt-ui-button>
          <tt-ui-button
              success
              @click="goEdit()"
          >Crear</tt-ui-button>
        </div>
      </template>
    </tt-ui-header-bar>
    <div class="p-5 mb-6">
      <tt-ui-filters-tabs
          :filters="filters"
          v-if="filterCounter"
          :tab-names="tabFilterLabels"
          @delete="deleteFilter($event)"
      />
      <tt-ui-data-table
          :paginated="true"
          :table-data="data"
          :columns="columns"
          :loading="showLoader"
          sort-field="id"
          :total-records="totalRecords"
          :records-per-page="recordsPerPage"

          :actions="true"
          defaultsortorder="ASC"
          :actionbuttons="actionbuttons"

          @sort="onSort"
          @edit="goEdit"
          @view="goPreview"
          @delete="deleteRow"
          @pageChange="onPageChange"
      />
    </div>
  </section>
</template>

<script lang="ts">
//import { CONFIG } from '@/app-config';
import tasksColumns from '@/constants/columns/track/tasks';
import { listBaseViewMixin } from '@/mixins/listBaseView';
import { defineComponent } from 'vue'
import { useDataTable } from '@/stores/dataTable'
import TtUiDrawer from "@/components/visualization/Drawer.vue";
import TtUiButton from "@/components/form/Button.vue";
import TtUiHeaderBar from "@/components/form/HeaderBar.vue";
import TtUiDivider from "@/components/common/Divider.vue";
import TtUiFiltersTabs from "@/components/form/FilterTabs.vue";
import TtUiDataTable from "@/components/visualization/DataTable.vue";

export default defineComponent({
  name: 'tt-ui-list',

  setup() {
    const dataTable = useDataTable();

    return { dataTable };
  },

  data() {
    return {
      id: null,
      status: [],
      modules: [],
      isFetching: false,
      idRowProperty: 'id',
      routeBaseName: 'track.tasks',
      descriptionRowProperty: 'id',
      fetchPayload: {
        withParams: true,
        url: '', //CONFIG.ENDPOINT.USUARIOS,
      },
      actionbuttons: [
        { event: 'view', label: 'Visualizar', disabled: false },
        { event: 'edit', label: 'Editar', disabled: false },
        { separator: true, disabled: false },
        { event: 'delete', label: 'Eliminar', disabled: false },
      ],
    };
  },

  components: {
    TtUiDataTable,
    TtUiFiltersTabs,
    TtUiDivider,
    TtUiHeaderBar,
    TtUiButton,
    TtUiDrawer
  },

  mixins: [listBaseViewMixin],

  mounted() {
    this.updatePaginationData({
      ...this.pagination,
      sortfield: 'id',
      page: 1,
    });

    this.fetchData(this.fetchPayload);
    this.updateColumnsTable(tasksColumns);
  },
});
</script>
