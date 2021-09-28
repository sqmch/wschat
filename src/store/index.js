import { createStore } from "vuex";

export default createStore({
	state: {
		username: null,
		channel: "general",
	},
	mutations: {
		setUserName(state, payload) {
			state.username = payload;
		},
		setChannel(state, payload) {
			state.channel = payload;
		},
	},
	actions: {},
	modules: {},
});
