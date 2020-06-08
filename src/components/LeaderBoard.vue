<template>
  <div class="bodyLeader">
    <div class="container">
      <div style="text-align: center;">
        <h1
          style="
            background-color: rgba(0, 0, 0, 0.87);
            width: 340px;
            margin: auto auto 10px;
            color: aliceblue;
            border: solid rgb(118, 123, 124);
            border-radius: 8px;
            padding: 4px;
            font-size: 35px;
          "
        >
          LEADERBOARD
        </h1>
      </div>
      <div
        class="table-responsive"
        style="
          width: 70%;
          max-height: 100vh;
          height: 300px;
          margin: auto;
          background: #000000c9;
          border-radius: 15px;
          border-right: solid;
          border-top: solid;
          border-left: solid;
          border-width: 8px;
          border-color: #767b7c;
          margin-bottom: 50px;
        "
      >
        <table
          class="table table table"
          style="text-align: center; color: greenyellow; font-size: 15px;"
        >
          <thead
            style="
              color: white;

              width: 66.3%;

              background: black;
              border-radius: 5px;
            "
          >
            <tr>
              <th>Pos</th>
              <th>Player</th>
              <th>Games Won</th>
              <th>Games Lost</th>
              <th>Games Tied</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, i) in players" :key="i">
              <td v-if="i >= 0 && i < 3" class="ranking">
                {{ i + 1 }}
              </td>
              <td v-else>
                <span style="color: white;">{{ i + 1 }}</span>
              </td>
              <td>{{ player.name }}</td>
              <td>{{ player.wins }}</td>
              <td>{{ player.losses }}</td>
              <td>{{ player.ties }}</td>
              <td>{{ player.totalScore }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["leader"],
  data() {
    return {
      players: [],
      puntaje: [],
    };
  },
  methods: {
    getData() {
      let url = "https://s4lvogame.herokuapp.com";
      axios
        .get(url + "/api/leaderboard", {
          withCredentials: true,
        })
        .then(res => {
          this.players = res.data;
          this.players.sort(function (a, b) {
            return b.totalScore - a.totalScore;
          });
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.ranking {
  color: red;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.container {
  max-width: 1320px !important;
}
</style>
