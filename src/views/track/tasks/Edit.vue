<template>
  <section style="height: calc(100vh - 90px);">
    <VeeForm
        @submit="save"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
        v-slot="{ errors }"
    >
      <tt-ui-header-bar :title="this.title" color="theme">
        <template v-slot:actions>
          <tt-ui-button
              class="mr-2"
              @click="$router.push({ name: 'track.tasks' })"
          >Volver</tt-ui-button>
          <tt-ui-button submit success class="ml-2">Guardar</tt-ui-button>

        </template>
      </tt-ui-header-bar>

      <div class="hero m-0 py-4" style="height: calc(100% - 90px);">
        <tt-ui-form-container simple>
          <tt-ui-title>Formulario</tt-ui-title>

          <VeeField
              v-model="usuarios.nombre"
              name="nombre"
              v-slot="{ field, validate }"
          >
            <b-field
                class="mb-3"
                label="Titulo"
                :message="errors.nombre"
                :type="{ 'is-danger': errors.nombre, 'is-success': validate  }"
            >
              <b-input v-bind="field" maxlength="40" placeholder="Ingrese un nombre para el usuario"/>
            </b-field>
          </VeeField>

          <VeeField
              v-model="usuarios.numdoc"
              name="numdoc"
              v-slot="{ field, validate }"
          >
            <b-field
                class="mb-3"
                label="Descripción"
                :message="errors.numdoc"
                :type="{ 'is-danger': errors.numdoc, 'is-success': validate }"
            >
              <b-input v-bind="field" maxlength="10" placeholder="Ingrese una descripción"/>
            </b-field>
          </VeeField>

          <VeeField
              v-model="usuarios.apellido"
              name="apellido"
              v-slot="{ field, validate }"
          >
            <b-field
                class="mb-3"
                label="Prioridad"
                :message="errors.apellido"
                :type="{ 'is-danger': errors.apellido, 'is-success': validate }"
            >
              <b-input v-bind="field" maxlength="40" placeholder="Ingrese la prioridad"/>
            </b-field>
          </VeeField>

          <VeeField
              v-model="usuarios.usuario"
              name="usuario"
              v-slot="{ field, validate }"
          >
            <b-field
                class="mb-3"
                label="Asignado a"
                :message="errors.usuario"
                :type="{ 'is-danger': errors.usuario, 'is-success': validate}"
            >
              <b-input v-bind="field" maxlength="100" placeholder="Ingrese el responsable"/>
            </b-field>
          </VeeField>
        </tt-ui-form-container>
      </div>
    </VeeForm>
  </section>
</template>

<script lang="ts">
//import { CONFIG } from "@/app-config";
import { dataService } from "@/api/DataServiceApi";
import { formUtils } from "@/helpers/formUtilities";
import { defineComponent } from 'vue'
import { Field as VeeField, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import TtUiHeaderBar from "@/components/form/HeaderBar.vue";
import TtUiButton from "@/components/form/Button.vue";
import TtUiFormContainer from "@/components/common/FormContainer.vue";
import TtUiTitle from "@/components/common/Title.vue";

export default defineComponent({
  name: 'tt-ui-edit',

  setup() {
    const schema = yup.object({
      apellido: yup.string().required().max(40),
      nombre: yup.string().required().max(40),
      id_entidad: yup.number().required(),
      id_rol: yup.number().required(),
      numdoc: yup.number().required().max(99999999999),
      usuario: yup.string().required().max(100),
      clave: yup.string().nullable().max(1000)
    });

    return { schema }
  },

  data() {
    return {
      isFetching: false,
      id_usuario: null,
      usuarios: {
        apellido: '',
        nombre: '',
        id_entidad: null,
        id_rol: null,
        numdoc: null,
        usuario: '',
        clave: null
      },
      roles : [],
      entidades : [],
      title: "Tareas ",
    };
  },

  components: {
    TtUiTitle,
    TtUiFormContainer,
    TtUiButton,
    TtUiHeaderBar,
    VeeForm,
    VeeField
  },

  methods: {
    async save() {
      let request = null;
      const payload = { ...this.usuarios };
      const loadingComponent = this.$buefy.loading.open();
      if (this.id_usuario) {
        request = dataService.put(
            `${CONFIG.ENDPOINT.USUARIOS}/`,
            payload,
            this.id_usuario,
        );
      } else {
        request = dataService.post(`
          ${CONFIG.ENDPOINT.USUARIOS}/${this.id_usuario ? `${this.id_usuario}` : ''}`,
            payload
        );
      }

      request
          .then(() => this.$router.push({ name: 'parametric.usuarios' }))
          .finally(() => loadingComponent.close());
    },

    onInvalidSubmit() {
      this.$buefy.notification.open({
        duration: 4000,
        message: 'El formulario no superó la validación',
        hasIcon: true,
        type: "is-danger"
      });
    }
  },

  async beforeMount() {
    const loadingComponent = this.$buefy.loading.open();

    if (this.$route.params.id !== 'new') {
      this.id_usuario = formUtils.base64ToUtf8(this.$route.params.id);

      // const req = await dataService.get(
      //     `${CONFIG.ENDPOINT.USUARIOS}/${this.id_usuario}/`
      // );

      this.usuarios = { id_usuario: 1, nombre: 'User', apellido: '1', usuario: 'user', numdoc: 123456, fecha_login: '01-01-2024', fecha_creacion: '01-01-2024'},
      this.title = formUtils.shortString("Usuario ID: "+this.usuarios.id_usuario+"-"+this.usuarios.usuario);
    }

    loadingComponent.close();
  },

  beforeUnmount() {
    this.usuarios   = {};
    this.id_usuario = null;
  },
});
</script>
