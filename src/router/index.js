import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import ChatRoom from "@/components/ChatRoom.vue";
import store from "../store";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/chatroom",
		name: "ChatRoom",
		component: ChatRoom,
		beforeEnter: () => {
			if (store.state.username) {
				return true;
			} else {
				router.push("/");
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
