<template>
  <q-page class="flex flex-center">
    <q-input v-model="username" label="Standard" />

    <q-btn
      :to="'chatroom'"
      @click="setUser()"
      color="white"
      text-color="black"
      label="Standard"
    />
  </q-page>
</template>

<style>
</style>

<script>
import { ref } from "vue";
import { mapMutations } from "vuex";
import store from "../store";

export default {
  name: "ChatRoom",

  setup() {
    let username = ref("");
    function setUser() {
      store.commit("setUserName", username.value);
      console.log(store.state.username);
    }
    return {
      username,
      setUser,
    };
  },
  methods: {
    ...mapMutations([
      "setUserName", // map `this.increment()` to `this.$store.commit('increment')`'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
  },
};
</script>
