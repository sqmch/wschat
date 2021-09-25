import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import ChatRoom from "@/components/ChatRoom.vue";

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
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
