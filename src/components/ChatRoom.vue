<template>
  <q-page class="homebg flex flex-center">
    <q-input v-model="username" label="Standard" />
    <q-input v-model="message_text" label="Standard" />

    <q-btn
      @click="sendMessage()"
      color="white"
      text-color="black"
      label="Standard"
    />
    <q-input v-model="messages" filled type="textarea" />
  </q-page>
</template>

<script>
export default defineComponent({
  name: "ChatRoom",
});
</script>

<script setup>
import { ref, defineComponent } from "vue";
import store from "../store";

const messages = ref([]);
let message_text = ref("");
const username = store.state.username;
const ws = new WebSocket(`ws://localhost:8000/ws/${store.state.username}`);

ws.onmessage = function (event) {
  messages.value.push(event.data);
  console.log("onmessage event.data: ", messages.value);
  console.log("messages: ", messages.value);
};
function sendMessage() {
  console.log("sendMessage ran with text: ", message_text.value);
  ws.send(message_text.value);
  message_text.value = "";
}
</script>
<style lang="sass">
.homebg
  background: rgb(255, 227, 227)
  background: radial-gradient(circle, rgba(231, 224, 201,0.8239670868347339) -25%, rgba(17, 50, 77,0.8127626050420168) 150%, rgba(17, 50, 77,0.8) 100%)
</style>
