<template>
  <q-layout view="lHh Lpr lFf">
    <router-view />
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LayoutDefault",

  components: {},

  setup() {
    const client_id = Date.now();
    return {
      leftDrawerOpen: ref(false),
      client_id,
    };
  },
};
</script>
