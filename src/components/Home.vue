<template>
  <q-page class="homebg flex flex-center">
    <div class="row" style="">
      <div class="col-md-4 col-xs-12">
        <div class="userinput">
          <q-input outlined v-model="channel" label="Your channel" />
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="userinput">
          <q-input
            @keydown.enter.prevent="setUser"
            outlined
            v-model="username"
            label="Your username"
          />
        </div>
      </div>

      <div class="userinput col-md-4 col-xs-12">
        <div class="row">
          <q-btn
            large
            class="col enterButton"
            :to="'chatroom'"
            @click="setUser"
            label="Enter"
            :ripple="{ color: 'yellow' }"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default defineComponent({
  name: "ChatRoom",
  methods: {
    ...mapMutations([
      "setUserName",
      "setChannel", // map `this.increment()` to `this.$store.commit('increment')`'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
  },
});
</script>

<script setup>
import { ref, defineComponent } from "vue";
import { mapMutations } from "vuex";
import store from "../store";
import router from "../router";

let username = ref("");
let channel = ref(store.state.channel);

function setUser() {
  store.commit("setUserName", username.value);
  if (channel.value !== "") {
    store.commit("setChannel", channel.value);
  }
  console.log(store.state.username);
  router.push("/chatroom");
}
</script>
<style lang="sass">
.enterButton
  margin-left: 0em
  margin-top: 0.2em
  background: #1C2321
  color: #EEF1EF
  font-size: 1.1em
  letter-spacing: 0.1rem
  height: 3.3em

.userinput
  padding: 10px
</style>
