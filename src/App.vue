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
<style lang="sass">
.homebg
  padding: 20px
  //background: #A9B4C2
  //background: radial-gradient(circle, rgba(231, 224, 201,0.7) -55%, rgba(17, 50, 77,0.8127626050420168) 100%, rgba(17, 50, 77,0.8) 100%)
  background: linear-gradient(-45deg, #7D98A1, #A9B4C2, #7D98A1, #EEF1EF)
  background-size: 400% 400%
  animation: gradient 35s ease infinite

@keyframes gradient
  0%
    background-position: 0% 50%

  50%
    background-position: 100% 100%

  100%
    background-position: 0% 50%
</style>
