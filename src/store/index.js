import { createStore } from "vuex";

export default createStore({
	state: {
		username: null,
	},
	mutations: {
		setUserName(state, payload) {
			state.username = payload;
		},
	},
	actions: {},
	modules: {},
});
