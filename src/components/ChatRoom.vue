<template>
  <q-page class="homebg">
    <q-toolbar class="toolbar">
      <q-toolbar-title></q-toolbar-title>
      <q-btn-dropdown stretch flat label="Channels">
        <q-list>
          <q-item-label header>Folders</q-item-label>
          <q-item
            v-for="n in 3"
            :key="`x.${n}`"
            clickable
            v-close-popup
            tabindex="0"
          >
            <q-item-section avatar>
              <q-avatar icon="folder" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Photos</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
    <div>
      <q-scroll-area ref="chatScroll" style="width: 100%; height: 85vh">
        <div class="row" v-for="message in messages" :key="message">
          <q-chat-message
            :sent="message.isMe"
            :name="message.user"
            text-color="white"
          >
            <div>{{ message.msg }}</div>
          </q-chat-message>
        </div>
      </q-scroll-area>
    </div>
    <div class="row absolute-bottom">
      <div class="col-10" style="padding: 10px">
        <q-input
          outlined
          @keydown.enter.prevent="sendMessage"
          v-model="message_text"
          :label="sayMsg()"
          clearable
          clear-icon="close"
        />
      </div>
      <div class="col-2" style="">
        <q-btn
          @click="sendMessage"
          icon="send"
          size="large"
          style="margin-top: 0.8em"
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
const ws = new WebSocket(
  `ws://localhost:8000/ws/${store.state.channel}/${store.state.username}`
);

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
function sayMsg() {
  return "Say something in #" + store.state.channel + "...";
}
</script>
<style lang="sass">
.q-message-sent .q-message-text
  color: #1C2321
.q-message-received .q-message-text
  color: #5E6572
.q-field--outlined:hover .q-field__control:after
  border-color: #1C2321
.q-if-label
  color: #FFF
.q-input::before
  border-color: #FFF

.toolbar
  margin-bottom: 1em
</style>
