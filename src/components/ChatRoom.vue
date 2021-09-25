<template>
  <q-page class="flex flex-center">
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

<style>
</style>

<script>
import { ref } from "vue";
import store from "../store";

export default {
  name: "ChatRoom",
  setup() {
    const messages = ref([]);
    let message_text = ref("");
    const username = store.state.username;
    const ws = new WebSocket(`ws://localhost:8000/ws/${store.state.username}`);

    ws.onmessage = function (event) {
      messages.value.push(event.data);
      console.log("onmessage event.data: ", messages.value);
      console.log("messages: ", messages.value);
    };
    function addMessage() {}
    function sendMessage() {
      console.log("sendMessage ran with text: ", message_text.value);
      ws.send(message_text.value);
      message_text.value = "";
    }
    return {
      leftDrawerOpen: ref(false),
      username,
      message_text,
      sendMessage,
      addMessage,
      messages,
    };
  },
};
</script>
