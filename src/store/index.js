import { createStore } from "vuex";

export default createStore({
	state: {
		username: "Default_user",
	},
	mutations: {
		setUserName(state, payload) {
			state.username = payload;
		},
	},
	actions: {},
	modules: {},
});
