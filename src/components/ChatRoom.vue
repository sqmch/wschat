<template>
  <div>
    <q-layout>
      <q-drawer v-model="drawer" :width="200" :breakpoint="500" class="drawer">
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="channel in channels.channels" :key="channel">
              <q-item
                style="letter-spacing: 0.1rem"
                clickable
                dark
                :active="true"
                v-ripple
                @click="onChannelSelect(channel)"
              >
                <q-item-section avatar>
                  <q-icon style="color: white" name="arrow_right" />
                </q-item-section>
                <q-item-section style="color: #eef1ef">
                  {{ channel }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="channel.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <q-page class="homebg">
          <q-toolbar class="toolbar">
            <q-btn
              flat
              @click="drawer = !drawer"
              round
              dense
              size="medium"
              icon="menu"
              style="margin-right: 10px"
            />
            <q-btn
              flat
              to="/"
              round
              dense
              size="large"
              icon="arrow_left"
              style="margin-right: 0px"
            />

            <q-toolbar-title
              style="padding-bottom: 0.15em; letter-spacing: 0.1rem"
              >#{{ store.state.channel }}</q-toolbar-title
            >
            <!--<q-btn-dropdown stretch flat label="Channels">
              <q-list style="background: #1c2321; color: #eef1ef">
                <q-item
                  style="letter-spacing: 0.1rem"
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
            </q-btn-dropdown>-->
          </q-toolbar>

          <div>
            <q-scroll-area ref="chatScroll" style="width: 100%; height: 78vh">
              <div class="row" v-for="message in messages" :key="message">
                <q-chat-message
                  :sent="message.isMe"
                  :name="message.user"
                  text-color="white"
                >
                  <div class="text-body1">{{ message.msg }}</div>
                </q-chat-message>
              </div>
            </q-scroll-area>
          </div>
          <div class="row absolute-bottom">
            <div class="col-9" style="padding: 10px">
              <q-input
                outlined
                @keydown.enter.prevent="sendMessage"
                v-model="message_text"
                :label="sayMsg()"
                clearable
                clear-icon="close"
              />
            </div>
            <div class="col-3" style="">
              <div class="row">
                <q-btn
                  @click="sendMessage"
                  icon="send"
                  class="col sendButton"
                />
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default defineComponent({
  name: "ChatRoom",
  mounted() {
    // 1
  },
});
</script>

<script setup>
import { ref, defineComponent } from "vue";
import store from "../store";
import router from "../router";

const drawer = ref();
const chatScroll = ref(null);
const messages = ref([]);
const channels = ref(["general"]);
let message_text = ref("");
const username = store.state.username;
const ws = new WebSocket(
  `wss://wschat1.herokuapp.com/ws/${store.state.channel}/${store.state.username}`
);
ws.onopen = () => ws.send("wsconnected");
ws.onclose = () => ws.send("wsclosed");

ws.onmessage = function (event) {
  const isMe = event.data.split(":")[0] === username;
  if (event.data.split(":")[1] !== "wsconnected") {
    messages.value.push({
      user: event.data.split(":")[0],
      msg: event.data.split(":")[1],
      isMe: isMe,
    });
    scroll();
  }

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
  store.state.username = username;

  router.push("/");
}
</script>
<style lang="sass">
.q-message-sent .q-message-text
  color: #1C2321
.q-message-received .q-message-text
  color: #1C232195
.q-field--outlined:hover .q-field__control:after
  border-color: #1C2321
.q-if-label
  color: #FFF
.q-input::before
  border-color: #FFF

.toolbar
  margin-bottom: 1em

.menu-list .q-item
  border-radius: 0 32px 32px 0

.drawer
  background: #1C2321//, #EEF1EF

.sendButton
  margin-left: 0em
  margin-right: 10px
  margin-top: 0.8em
  color: #1C2321 //#EEF1EF
  font-size: 1em
  letter-spacing: 0.1rem
  height: 3.73em
</style>
