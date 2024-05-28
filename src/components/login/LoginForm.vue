<template>
  <VeeForm @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
    <VeeField name="username" v-slot="{ field, validate }">
      <b-field
        label="Usuario"
        class="text-left"
        :type="{ 'is-danger': errors.username, 'is-success': validate }"
        :message="errors.username"
      >
        <b-input v-bind="field" size="large" placeholder="Usuario" icon-pack="fas" icon="user">
        </b-input>
      </b-field>
    </VeeField>

    <VeeField name="password" v-slot="{ field, validate }">
      <b-field
        label="Contraseña"
        class="text-left mt-4"
        :type="{ 'is-danger': errors.password, 'is-success': validate }"
        :message="errors.password"
      >
        <b-input
          v-bind="field"
          type="password"
          size="large"
          placeholder="Contraseña"
          icon-pack="fas"
          icon="key"
          password-reveal
        >
        </b-input>
      </b-field>
    </VeeField>

    <br />

    <div class="text-right">
      <b-button type="is-primary" native-type="submit" icon-right="sign-in-alt" expanded>
        Ingresar
      </b-button>
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as yup from 'yup'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required()
    })

    return { schema }
  },

  components: {
    VeeForm,
    VeeField
  },

  methods: {
    onSubmit(values: Record<string, any>) {
      this.$emit('login', { username: values.username, password: values.password })
    }
  }
})
</script>
