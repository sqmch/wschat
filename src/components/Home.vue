<template>
  <q-page class="homebg flex flex-center">
    <div class="usernamebg row" style="">
      <div class="col-8">
        <q-input
          @keydown.enter.prevent="setUser"
          outlined
          v-model="username"
          label="Your username"
        />
      </div>
      <div class="col-4">
        <div class="">
          <q-btn
            large
            class="enterButton"
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
      "setUserName", // map `this.increment()` to `this.$store.commit('increment')`'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
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
function setUser() {
  store.commit("setUserName", username.value);
  console.log(store.state.username);
  router.push("/chatroom");
}
</script>
<style lang="sass">
.homebg
  background: rgb(255, 227, 227)
  background: radial-gradient(circle, rgba(231, 224, 201,0.8239670868347339) -25%, rgba(17, 50, 77,0.8127626050420168) 150%, rgba(17, 50, 77,0.8) 100%)

.usernamebg
  padding: 25px
  width: 25em

.enterButton
  margin-left: 1.5em
  margin-top: 0.5em
  background: #1C2321
  color: #FFE3E3
  font-size: 1.1em
  letter-spacing: 0.1rem
</style>
