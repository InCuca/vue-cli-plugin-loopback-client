<template>
  <v-content class="gradient">
    <v-container
      fluid
      fill-height>
      <v-layout
        align-center
        justify-center>
        <v-flex
          xs12
          sm8
          md4
          style="max-width: 400px;">
          <v-card class="elevation-4">
            <v-form
              ref="signInForm"
              style="max-width: 300px;margin-left: auto;margin-right: auto;"
              @submit.prevent="onSubmit">
              <v-card-text>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  required/>
                <v-text-field
                  v-model="password"
                  :rules="[v => !!v || 'Senha é obrigatória']"
                  label="Senha"
                  type="password"
                  required
                  class="pb-0"/>
                <div
                  v-if="error"
                  class="red white--text pa-2 my-2"
                  role="alert">{{ error.message }}</div>
                <div class="py-3">
                  <v-btn
                    block
                    large
                    type="submit">Entrar</v-btn>
                </div>
                <v-layout class="pb-3 justify-space-between">
                  <a
                    href
                    class="primary--text font-weight-medium"
                    @click.prevent.stop="passwordDialog = true">Esqueceu a senha?</a>
                </v-layout>
              </v-card-text>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="passwordDialog"
        lazy
        max-width="500">
        <v-form
          ref="recoverForm">
          <v-card>
            <v-card-title>Recuperação de Senha</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="recEmail"
                :rules="emailRules"
                label="Insira seu email"
                required
                type="email"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                flat
                @click.native="passwordDialog = false">Cancelar</v-btn>
              <v-btn
                @click="sendRecoverEmail">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-snackbar
        v-model="passwordDialogOk"
        multi-line
        color="success"
        bottom>
        <p>Enviado! Verifique a caixa de entrada do seu e-mail para o link de reset.</p>
      </v-snackbar>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Login',
  props: {
    sessionError: {
      type: Error,
      default: null,
    },
  },
  data() {
    return {
      valid: true,
      email: null,
      password: null,
      recEmail: null,
      error: null,
      recoverError: null,
      recoverSuccess: null,
      recoverEmail: null,
      passwordDialog: false,
      passwordDialogOk: false,
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+/.test(v) || 'E-mail precisa ser válido',
      ],
    };
  },
  watch: {
    sessionError: {
      handler(err) {
        this.error = err;
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.error = null;
      if (this.$refs.signInForm.validate()) {
        this
          .$store
          .dispatch('auth/signIn', {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push({ name: 'dashboard' });
          })
          .catch((err) => {
            this.error = err;
          });
      }
    },
    sendRecoverEmail() {
      this.recoverError = null;
      if (this.$refs.recoverForm.validate()) {
        this
          .$store
          .dispatch('auth/rememberPassword', this.recEmail)
          .finally(() => {
            this.recEmail = null;
            this.passwordDialog = false;
            this.passwordDialogOk = true;
          });
      } else {
        this.recoverError = {
          message: 'Por favor, cheque o e-mail inserido e tente novamente',
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  height: 100vh;
}
.card {
  border: none;
  margin: auto;
}
.card .logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card .logo img {
  margin: 30px;
  max-width: 108px;
}
.link {
  cursor: pointer;
}

.forgot-form {
  text-align: center;
}

</style>
