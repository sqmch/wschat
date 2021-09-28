<template>
  <q-page class="homebg">
    <q-toolbar class="toolbar">
      <q-toolbar-title></q-toolbar-title>
      <q-btn-dropdown stretch flat label="Channels">
        <q-list style="background: #eef1ef">
          <q-item
            v-for="channel in channels.channels"
            :key="channel"
            clickable
            v-close-popup
            @click="onChannelSelect(channel)"
          >
            <q-item-section>
              <q-item-label>{{ channel }}</q-item-label>
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
import router from "../router";

const chatScroll = ref(null);
const messages = ref([]);
const channels = ref(store.state.channels);
let message_text = ref("");
const username = store.state.username;
const ws = new WebSocket(
  `ws://localhost:8000/ws/${store.state.channel}/${store.state.username}`
);

ws.onmessage = function (event) {
  const isMe = event.data.split(":")[0] === username;
  //channels.value = event.data.split("{")[1].substr(0, -1);
  messages.value.push({
    user: event.data.split(":")[0],
    msg: event.data.split(":")[1],
    isMe: isMe,
  });
  const channelsraw = '{"channels":' + event.data.split(":")[2] + "}";
  channels.value = JSON.parse(channelsraw.replaceAll("'", '"'));
  store.state.channels = channels.value;
  console.log(channels.value);
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

function onChannelSelect(channel) {
  if (channel !== "") {
    store.commit("setChannel", channel);
  }
  store.state.channel = channel;
  router.push("/");

  //router.push("/chatroom");
  console.log("Channel sent from dropdown: ", channel);
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
