import Vue from "vue";
import VueRouter from "vue-router";
import Games from "../views/Games.vue";
import Game from "../views/Game.vue";
import LeaderBoard from "../components/LeaderBoard";
import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Games",
    component: Games,
  },

  {
    path: "/game/gp/:id",
    name: "Game",
    props: true,
    component: Game,
  },
  {
    path: "/leaderBoard",
    name: "LeaderBoard",
    component: LeaderBoard,
  },
  {
    path: "/helloWorld",
    name: "HelloWorld",
    component: HelloWorld,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
