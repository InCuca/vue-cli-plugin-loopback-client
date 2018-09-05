<template lang="html">
  <v-container
    fluid
    fill-height>
    <v-layout
      align-center
      justify-center>
      <v-card>
        <v-card-text>
          <v-form @submit="onSubmit">
            <v-text-field
              v-if="access_token === null"
              v-model="password"
              :rules="[v => !!v || 'Senha atual é obrigatória']"
              label="Senha atual"
              type="password"
              required
              class="pb-0"/>
            <v-text-field
              v-model="passwordNew1"
              :rules="[v => !!v || 'Nova senha é obrigatória']"
              label="Nova senha"
              type="password"
              required
              class="pb-0"/>
            <v-text-field
              v-model="passwordNew2"
              :rules="[v => !!v || 'Confirmação é obrigatória']"
              label="Confirmação da nova senha"
              type="password"
              required
              class="pb-0"/>
            <v-snackbar
              v-if="error"
              v-model="snackError"
              color="error"
              bottom>
              {{ error.message }}
              <v-btn
                dark
                flat
                @click.native="snackError = false">Fechar</v-btn>
            </v-snackbar>
            <div class="flex">
              <v-btn
                @click="onCancel">
                Cancelar
              </v-btn>
              <v-btn
                type="submit">
                Salvar
              </v-btn>
            </div>
          </v-form>
          <v-snackbar
            v-model="snackSuccess"
            color="success">
            A senha foi alterada com sucesso.
            <v-btn
              dark
              flat
              @click.native="snackSuccess = false">Fechar</v-btn>
          </v-snackbar>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable camelcase */
export default {
  props: {
    access_token: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      password: null,
      passwordNew1: null,
      passwordNew2: null,
      snackError: false,
      snackSuccess: false,
      error: null,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.error = null;

      if (this.passwordNew1 !== this.passwordNew2) {
        this.error = new Error('The password does not match, please try again');
        return;
      }

      this.$store
        .dispatch('auth/resetPassword', {
          oldPassword: this.password,
          newPassword: this.passwordNew1,
          access_token: this.access_token,
        })
        .then(() => {
          this.snackSuccess = true;
        })
        .catch((err) => {
          this.snackError = true;
          this.error = err;
        });
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.go(-1);
    },
    onModalOk() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-view {
  display: flex;
  height: 100vh;
}
</style>
