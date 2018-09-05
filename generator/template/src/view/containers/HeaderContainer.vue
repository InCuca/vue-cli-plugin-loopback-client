<template lang="html">
  <v-toolbar
    light
    class="background--white elevation-0 main-toolbar">
    <v-toolbar-title>
      <img
        src="../../../static/images/logo.png"
        height="40"
        style="vertical-align: middle" >
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down ml-4">
      <v-btn
        :to="{name: 'profile'}"
        flat
        ripple
        router
        class="grey--text text--darken-2">
        ALTERAR SENHA
      </v-btn>
      <v-btn
        flat
        ripple
        router
        class="grey--text text--darken-2"
        @click="onLogoutClick">
        SAIR
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    onLogoutClick() {
      this
        .$store
        .dispatch('auth/signOut')
        .catch();
    },
  },
};
</script>

<style lang="css">
.logo img {
  margin: 0 14px;
  max-height: 72px;
}
</style>
