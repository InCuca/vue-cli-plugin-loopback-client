<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    // Boot Application
    this.$store.dispatch('async/syncLoopback');
  },
};
</script>

<style lang="stylus">
  /* App Theme */
  @import './style/app';
</style>

