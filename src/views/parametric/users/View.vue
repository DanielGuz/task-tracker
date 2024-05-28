<template>
  <section style="height: calc(100vh - 90px);">
    <tt-ui-header-bar
        :title="title"
        color="theme"
    >
      <template v-slot:actions>
        <tt-ui-button
            @click="$router.push({ name: 'parametric.users' })">
          Volver
        </tt-ui-button>
      </template>
    </tt-ui-header-bar>
    <div class="hero m-0 py-4" style="height: calc(100% - 90px);">
      <tt-ui-form-container simple>
        <tt-ui-summary-label label="ID Usuario" :description="usuarios.id_usuario || '-'" />
        <tt-ui-summary-label label="Nombre" :description="usuarios.nombre  || '-'" />
        <tt-ui-summary-label label="Apellido" :description="usuarios.apellido|| '-'" />
        <tt-ui-summary-label label="Documento" :description="usuarios.numdoc  || '-'" />
        <tt-ui-summary-label label="Usuario" :description="usuarios.usuario || '-'" />
        <tt-ui-summary-label label="Fecha creación" :description="usuarios.fecha_creacion  || '-'" />
        <tt-ui-summary-label label="Último Login" :description="usuarios.fecha_login  || '-'" />
      </tt-ui-form-container>
    </div>
  </section>
</template>

<script lang="ts">
//import { CONFIG } from "@/app-config";
import { dataService } from "@/api/DataServiceApi";
import { formUtils } from "@/helpers/formUtilities";
import { defineComponent } from 'vue'
import TtUiHeaderBar from "@/components/form/HeaderBar.vue";
import TtUiButton from "@/components/form/Button.vue";
import TtUiFormContainer from "@/components/common/FormContainer.vue";
import TtUiSummaryLabel from "@/components/visualization/SummaryLabel.vue";

export default defineComponent({
  name: 'tt-ui-view',
  components: {TtUiSummaryLabel, TtUiFormContainer, TtUiButton, TtUiHeaderBar},

  data() {
    return {
      title: 'Usuario',
      usuarios: {},
      isFetching: false,
      id_usuario: null,
    };
  },

  mounted() {
    if (this.$route.params.id !== 'new') {
      this.id_usuario = formUtils.base64ToUtf8(this.$route.params.id);
      const loadingComponent = this.$buefy.loading.open();

      // dataService.get(
      //     `${CONFIG.ENDPOINT.USUARIOS}/${this.id_usuario}/`
      // ).then((res) => {
      //   this.usuarios = res.data.data;
      //   this.title = `${this.title} ID ${this.usuarios.id_usuario} - ${this.usuarios.usuario}`;
      // })
      //     .finally(() => loadingComponent.close());

      this.usuarios = { id_usuario: 1, nombre: 'User', apellido: '1', usuario: 'user', numdoc: 123456, fecha_login: '01-01-2024', fecha_creacion: '01-01-2024'},

      loadingComponent.close()
    }
  },
});
</script>
