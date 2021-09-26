<template>
  <q-page class="homebg">
    <div>
      <q-scroll-area ref="chatScroll" style="width: 100%; height: 85vh">
        <div class="row" v-for="message in messages" :key="message">
          <q-chat-message
            :sent="message.isMe"
            :name="message.user"
            text-color="white"
            bg-color="dark-yellow"
          >
            <div>{{ message.msg }}</div>
          </q-chat-message>
        </div>
      </q-scroll-area>
    </div>
    <div class="row absolute-bottom">
      <div class="col-10" style="padding: 5px">
        <q-input
          outlined
          @keydown.enter.prevent="sendMessage"
          v-model="message_text"
          label="Say something..."
          clearable
          clear-icon="close"
        />
      </div>
      <div class="col-2" style="">
        <q-btn
          @click="sendMessage"
          icon="send"
          size="large"
          style="margin-top: 0.5em"
        />
      </div>
    </div>
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

const chatScroll = ref(null);
const messages = ref([]);
let message_text = ref("");
const username = store.state.username;
const ws = new WebSocket(`ws://localhost:8000/ws/${store.state.username}`);

ws.onmessage = function (event) {
  const isMe = event.data.split(":")[0] === username;
  messages.value.push({
    user: event.data.split(":")[0],
    msg: event.data.split(":")[1],
    isMe: isMe,
  });
  scroll();
};
function sendMessage() {
  if (message_text.value.length > 0) {
    ws.send(message_text.value);
  } else {
    console.log("Error: Message can't be empty");
  }

  message_text.value = "";
  scroll();
}
function scroll() {
  const scrollArea = chatScroll.value;
  const scrollTarget = scrollArea.getScrollTarget();
  const duration = 300; //ms
  scrollArea.setScrollPosition("vertical", scrollTarget.scrollHeight, duration);
}
</script>
<style lang="sass">
.homebg
  padding: 20px
  //background: rgb(255, 227, 227)
  //background: radial-gradient(circle, rgba(231, 224, 201,0.7) -55%, rgba(17, 50, 77,0.8127626050420168) 220%, rgba(17, 50, 77,0.8) 100%)
  background: linear-gradient(-45deg, #E7E0C9, #C1CFC0, #6B7AA1, #11324D)
  background-size: 400% 400%
  animation: gradient 25s ease infinite
.q-message-sent .q-message-text
  color: #11324D
.q-message-sent
  color: black

@keyframes gradient
  0%
    background-position: 0% 50%

  50%
    background-position: 100% 50%

  100%
    background-position: 0% 50%
</style>
