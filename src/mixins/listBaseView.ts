import { dataService } from "@/api/DataServiceApi";
import { formUtils } from "@/helpers/formUtilities";
import { useDataTable } from '@/stores/dataTable'

export const listBaseViewMixin = {
  setup() {
    const dataTable = useDataTable();

    return { dataTable };
  },

  data() {
    return {
      actionbuttons: [],
      descriptionRowProperty: "",
      fetchPayload: {
        url: "",
        withParams: false,
      },
      idRowProperty: "id",
      isFetching: false,
      routeBaseName: "",
    };
  },

  computed: {
    data() { return this.dataTable.data; },
    filters() { return this.dataTable.filters; },
    columns() { return this.dataTable.columns; },
    showLoader() { return this.dataTable.showLoader; },
    pagination() { return this.dataTable.pagination; },
    showFilters() { return this.dataTable.showFilters; },
    totalRecords() { return this.dataTable.totalRecords; },
    recordsPerPage() { return this.dataTable.recordsPerPage; },
    tabFilterLabels() { return this.dataTable.tabFilterLabels; },

    filterTabKeys() {
      return Object.keys(this.filters).filter((x) => (
        (Array.isArray(this.filters[x]) && this.filters[x].length)
        || (!Array.isArray(this.filters[x]) && this.filters[x])
      ));
    },

    filterCounter() { return this.filterTabKeys.length; },

    onPageChangePayload() {
      return {
        ...this.pagination,
        sortfield: this.idRowProperty,
      };
    },
  },

  methods: {

    toggleFilters(status) {
      this.dataTable.toggleFilterDrawer(status);
    },

    fetchData(payload) {
      this.dataTable.fetchDataTable(payload);
    },

    updatePaginationData(payload) {
      this.dataTable.updatePaginationData(payload);
    },

    updateColumnsTable(payload) {
      this.dataTable.updateColumnsTable(payload);
    },

    clearDataFilters() {
      this.dataTable.updateFilters({});
      this.dataTable.updateTabFiltersLabels({});

      this.dataTable.fetchDataTable(this.fetchPayload);
    },

    deleteFilter(key) {
      const copyFilters = { ...this.filters };
      const copyTabsFilterLabel = { ...this.tabFilterLabels };

      delete copyFilters[key];
      delete copyTabsFilterLabel[key];

      this.dataTable.updateFilters(copyFilters);
      this.dataTable.updateTabFiltersLabels(copyTabsFilterLabel);

      this.dataTable.fetchDataTable(this.fetchPayload);
    },

    updateFiltersAndLabelTab({ field, value }, tabLabel) {
      this.dataTable.updateFilters({ ...this.filters, [field]: value });

      if (value) {
        this.dataTable.updateTabFiltersLabels({ ...this.tabFilterLabels, [field]: tabLabel });
      } else {
        const copyTabsFilterLabel = { ...this.tabFilterLabels };
        delete copyTabsFilterLabel[field];
        this.dataTable.updateTabFiltersLabels(copyTabsFilterLabel);
      }
    },

    onSort({ field, order }) {
      this.dataTable.updatePaginationData({
        ...this.pagination,
        sortfield: field,
        sortorder: order,
      });
      this.dataTable.fetchDataTable(this.fetchPayload);
    },

    onRecordsPerPage(ev) {
      this.dataTable.updatePaginationData({
        ...this.pagination,
        records_per_page: ev,
      });
      this.dataTable.fetchDataTable(this.fetchPayload);
    },

    onPageChange(value) {
      this.dataTable.updatePaginationData({ ...this.onPageChangePayload, page: value.page });
      this.dataTable.fetchDataTable(this.fetchPayload);
    },

    goPreview(row) {
      const params = row?.[this.idRowProperty]
        ? { id: formUtils.utf8ToBase64(row[this.idRowProperty]) }
        : {};
      this.$router.push({ name: `${this.routeBaseName}_view`, params })
        .catch(() => console.warn("Router: Prevent default"));
    },

    goEdit(row) {
      const params = row?.[this.idRowProperty]
        ? { id: formUtils.utf8ToBase64(row[this.idRowProperty]) }
        : { id: "new" };
      this.$router.push({ name: `${this.routeBaseName}_edit`, params })
        .catch(() => console.warn("Router: Prevent default"));
    },

    deleteRow(row) {
      const desc = row?.[this.descriptionRowProperty]
        ? `- ${row[this.descriptionRowProperty]}`
        : "";

      this.$swal({
        cancelButtonColor: "#a3a3a3",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#48c774",
        confirmButtonText: "Confirmar",
        icon: "warning",
        showCancelButton: true,
        text: `Registro a eliminar ID ${row[this.idRowProperty]} ${desc}`,
        title: "¿Estas seguro de eliminar el registro?",
        width: 700,
      }).then((result) => {
        if (result.isConfirmed) {
          const loadingComponent = this.$buefy.loading.open();
          dataService.delete(`${this.fetchPayload.url}/`, row[this.idRowProperty])
            .then(() => {
              this.dataTable.fetchDataTable(this.fetchPayload)
            })
            .catch((e) => console.error(e))
            .finally(() => loadingComponent.close());
        }
      });
    },
  },

  beforeMount() {
    this.dataTable.updateFilters({});
    this.dataTable.updateColumnsTable([]);
    this.dataTable.updatePaginationData({
      ...this.pagination,
      page: 1,
      sortfield: this.idRowProperty,
      sortorder: "desc",
    });
  },
};

export default {};
