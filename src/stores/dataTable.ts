import { defineStore } from 'pinia'
import { dataService } from "@/api/DataServiceApi";

export const useDataTable = defineStore('dataTable', {
  state: () => ({
    columns: [],
    data: [],
    filters: <any> {},
    pagination: {
      page: <number> 1,
      sortfield: <string> "id",
      sortorder: <string> "ASC",
    },
    params: {},
    recordsPerPage: <number> 10,
    selectedData: {},
    showFilters: <boolean> false,
    showLoader: <boolean> false,
    statusData: [
      { id: "2", name: "Activo" },
      { id: "1", name: "Inactivo" },
    ],
    tabFilterLabels: {},
    totalRecords: <number> 0,
  }),

  getters: {
    getFilters(state) {
      const auxFilter = <any> {};

      const keys = Object.keys(state.filters);

      for (let i = 0; i < keys.length; i += 1) {
        if (Array.isArray(state.filters[keys[i]]) && state.filters[keys[i]].length > 0) {
          auxFilter[keys[i]] = state.filters[keys[i]].join(",");
        }
        if (!Array.isArray(state.filters[keys[i]]) && state.filters[keys[i]]) {
          auxFilter[keys[i]] = state.filters[keys[i]];
        }
      }

      return auxFilter;
    }
  },

  actions: {
    setData(data: any) {
      this.data = data;
    },

    setLoading(status: boolean) {
      this.showLoader = status;
    },

    setTotalRecords(payload: any) {
      this.totalRecords = payload;
    },

    setRecordsPerPage(payload: any) {
      this.recordsPerPage = payload;
    },

    setFilters(payload: any) {
      this.filters = payload;
    },

    setPaginationData(payload: any) {
      this.pagination = payload;
    },

    setShowFilters(payload: any) {
      this.showFilters = payload;
    },

    setColumnsTable(payload: any) {
      this.columns = payload;
    },

    setTabFiltersLabels(payload: any) {
      this.tabFilterLabels = payload;
    },

    fetchDataTable(payload: any) {
      const { url, filters, withParams } = payload;

      this.setLoading(true);

      const params = withParams ? {
        ...this.pagination,
        filtros: JSON.stringify({ ...this.getFilters, ...filters })
      } : {};

      // dataService.get(url, { params })
      //   .then((res) => {
      //     const response = res.data;
      //     this.setData(response?.data || []);
      //     this.setTotalRecords(response?.totalrecords || 0);
      //     this.setRecordsPerPage(response?.recordsperpage || 10);
      //   })
      //   .catch((err) => { console.log(err); })
      //   .finally(() => { this.setLoading(false); })

      const data = [
        { id_usuario: 1, id: 1, title: 'Tarea 1', description: 'Actividad 1', nombre: 'User', apellido: '1', usuario: 'user', numdoc: 123456, fecha_login: '01-01-2024', fecha_creacion: '01-01-2024', created_at: '01-01-2024', updated_at: '01-01-2024', status: 'en progreso'},
        { id_usuario: 2, id: 2, title: 'Tarea 2', description: 'Actividad 2', nombre: 'User', apellido: '2', usuario: 'user', numdoc: 789014, fecha_login: '01-01-2024', fecha_creacion: '01-01-2024', created_at: '01-01-2024', updated_at: '01-01-2024', status: 'finalizada'}
      ]

      this.setData(data);
      this.setTotalRecords(2);
      this.setRecordsPerPage(10);
      this.setLoading(false);
    },

    updateColumnsTable(payload: any) {
      this.setColumnsTable(payload);
    },

    updateFilters(payload: any) {
      this.setFilters(payload);
    },

    updatePaginationData(payload: any) {
      this.setPaginationData(payload);
    },

    toggleFilterDrawer(payload: any) {
      this.setShowFilters(payload);
    },

    updateTabFiltersLabels(payload: any) {
      this.setTabFiltersLabels(payload);
    },
  },
});