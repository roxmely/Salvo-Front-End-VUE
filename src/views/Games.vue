<template>
  <div class="container" style="height: 100%;">
    <v-overlay v-if="alertLogin" opacity="0.1">
      <v-alert type="success" prominent>{{ alertLogin }}</v-alert>
    </v-overlay>
    <v-overlay v-if="errorCreate" opacity="0.1">
      <v-alert type="error" prominent>{{ errorCreate }}</v-alert>
    </v-overlay>
    <v-overlay v-if="errorLogin" opacity="0.1">
      <v-alert type="error" prominent>{{ errorLogin }}</v-alert>
    </v-overlay>
    <v-overlay v-if="errorSignup" opacity="0.1">
      <v-alert type="error" prominent>{{ errorSignup }}</v-alert>
    </v-overlay>

    <div id="app">
      <div
        v-show="userLogueado == false"
        style="
          display: flex;
          width: fit-content;
          align-items: center;
          margin-left: auto;
        "
      >
        <v-text-field
          style="font-weight: bolder; margin-right: 5px; font-size: 15px;"
          label="Username"
          v-model="username"
          prepend-icon="mdi-account-circle"
          @keyup.enter="login"
        />
        <v-text-field
          style="font-weight: bolder; margin-right: 5px; font-size: 15px;"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        />
        <div style="display: flex;">
          <button
            style="
              border: solid;
              border-radius: 8px;
              background: greenyellow;
              font-size: 10px;
              padding: 5px;
              max-width: 53px;
              width: 53px;
              height: 35px;
              max-height: 35px;
              margin-right: 5px;
            "
            @click="login"
          >
            LOGIN
          </button>
          <button
            style="
              border: solid;
              border-radius: 8px;
              background: greenyellow;
              font-size: 10px;
              padding: 5px;
              max-width: 53px;
              width: 53px;
              height: 35px;
              max-height: 35px;
            "
            @click="signup"
          >
            SIGNUP
          </button>
        </div>
      </div>

      <div style="display: flex; color: white; align-items: baseline;">
        <h1
          style="
            font-size: 20px;
            border: solid rgb(118, 123, 124);
            background-color: rgba(0, 0, 0, 0.87);
            border-radius: 8px;
            padding: 8px;
          "
          v-show="authenticated == true"
        >
          <span style="color: blue; font-size: 25px;">WELCOME </span>
          {{ username }}
        </h1>
        <button
          style="color: darkred;"
          class="logout"
          v-show="authenticated == true"
          v-on:click="logout"
        >
          <i class="mdi mdi-logout" style="font-size: 30px;"></i>
        </button>
        <!-- </v-card-actions>
        </v-app>-->
      </div>
    </div>
    <div style="text-align: center;">
      <h1
        style="
          background-color: rgba(0, 0, 0, 0.87);
          width: 300px;
          margin: auto auto 10px;
          color: aliceblue;
          border: solid rgb(118, 123, 124);
          border-radius: 8px;
          padding: 4px;
          font-size: 35px;
        "
      >
        GAME LIST
      </h1>
    </div>
    <div
      class="container table-responsive"
      style="
        margin: auto;
        width: 1050px;
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
        class="table table-striped header-fixed"
        style="text-align: center; color: greenyellow; font-size: 15px;"
      >
        <thead style="color: white; background: black; border-radius: 5px;">
          <tr>
            <th style="height: 60px;">
              <button
                v-show="authenticated == true"
                @click="createGame"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: auto;
                  border-radius: 15px;
                  border: solid;
                  border-width: 4px;
                  border-color: #767b7c;
                  width: 130px;
                  height: 42px;
                "
              >
                <img
                  style="width: 35pxpx; height: 35px;"
                  src="https://cdn.pixabay.com/photo/2014/04/02/14/08/radar-306289_960_720.png"
                  alt=""
                />
                <v-card-title style="font-size: 11px; color: red;"
                  >NEW GAME</v-card-title
                >
              </button>
            </th>
            <th>Game #</th>
            <th>Player 1 (creator)</th>
            <th>VS</th>
            <th>Player 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, i) in games" :key="i.id" :v-if="games">
            <td>
              <router-link
                v-if="userLogueado && getGpId(game)"
                :to="'/game/gp/' + getGpId(game)"
                style="text-decoration: none;"
              >
                <button
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: auto;
                    border-radius: 15px;
                    border: solid;
                    border-width: 2px;
                    border-color: green;
                    width: 105px;
                    height: 40px;
                  "
                  v-if="game.gamePlayers.length >= 2"
                  v-show="
                    username == game.gamePlayers[1].player.email ||
                    username == game.gamePlayers[0].player.email
                  "
                >
                  <img
                    style="width: 24px;"
                    src="https://image.flaticon.com/icons/svg/487/487021.svg"
                    alt=""
                  />

                  <v-card-title style="font-size: 8.5px; color: green;"
                    >PLAY NOW</v-card-title
                  >
                </button>

                <button
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: auto;
                    border-radius: 15px;
                    border: solid;
                    border-width: 2px;
                    border-color: red;
                    width: 105px;
                    height: 40px;
                  "
                  v-else-if="game.gamePlayers.length == 1"
                  v-show="username == game.gamePlayers[0].player.email"
                >
                  <img
                    style="width: 24px;"
                    src="https://image.flaticon.com/icons/svg/487/487021.svg"
                    alt=""
                  />
                  <v-card-title style="font-size: 10.5px; color: white;"
                    >WAITING</v-card-title
                  >
                </button>
              </router-link>
              <button
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: auto;
                  border-radius: 15px;
                  border: solid;
                  border-width: 4px;
                  border-color: #767b7c;
                  width: 105px;
                  height: 40px;
                "
                id="joinButton"
                v-if="
                  authenticated == true &&
                  games != null &&
                  game.gamePlayers.length == 1 &&
                  username != game.gamePlayers[0].player.email
                "
                @click="joinGame(game.id)"
              >
                <img
                  style="width: 24px;"
                  src="https://image.flaticon.com/icons/svg/487/487021.svg"
                  alt=""
                />
                <v-card-title style="font-size: 12px; color: cyan;"
                  >JOIN</v-card-title
                >
              </button>
              <p
                v-if="
                  authenticated &&
                  game.gamePlayers.length == 2 &&
                  username != game.gamePlayers[1].player.email &&
                  username != game.gamePlayers[0].player.email
                "
                style="color: powderblue; font-size: 18px; margin: auto;"
              >
                Full Game
              </p>
            </td>

            <td>{{ game.id }}</td>
            <td>{{ game.gamePlayers[0].player.email }}</td>
            <td></td>
            <td v-if="game.gamePlayers.length > 1">
              {{ game.gamePlayers[1].player.email }}
            </td>
            <td v-else>
              <span class="wait">Waiting for an opponent</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <leader />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import leader from "../components/LeaderBoard";
export default {
  name: "App",

  components: { leader },

  data() {
    return {
      dialog: false,
      userLogueado: "",
      username: "",
      password: "",
      showPassword: false,
      authenticated: false,
      games: null,
      players: [],
      time: new Date(),
      errorLogin: "",
      errorSignup: "",
      alertLogin: "",
      alertSigin: "",
      errorCreate: "",
    };
  },
  methods: {
    getData() {
      let url = "https://s4lvogame.herokuapp.com";
      axios
        .get(url + "/api/games", {
          withCredentials: true,
        })
        .then(res => {
          this.games = res.data.games;

          if (res.data.hasOwnProperty("player")) {
            this.authenticated = true;
            this.username = res.data.player.email;
            this.userLogueado = res.data.player.id;
          }

          setTimeout(() => {
            this.getData();
          }, 3000);
        });

      axios
        .get(url + "/api/leaderboard", {
          withCredentials: true,
        })
        .then(res => {
          this.players = res.data.players;
        });
    },
    signup() {
      let url = "https://s4lvogame.herokuapp.com";
      fetch(url + "/api/players", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.username.toLowerCase(),
          password: this.password,
        }),
      }).then(response => {
        console.log(response.status);
        if (response.status == 201) {
          this.alertSigin = "successful registration";
          this.login();
        } else if (response.status !== 201) {
          this.errorSignup = "invalid data or that account already exists";
        }
      });
    },
    clearInput() {
      this.username = "";
      this.password = "";
      this.errorLogin = "";
      this.errorSignup = "";
    },
    login() {
      let url = "https://s4lvogame.herokuapp.com";
      this.errorLogin = "";
      this.errorSignup = "";
      fetch(url + "/api/login", {
        credentials: "include",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: getBody({
          email: this.username.toLowerCase(),
          password: this.password,
        }),
      }).then(response => {
        this.getData();
        if (response.status == 200) {
          this.alertLogin = "Login successfully";

          this.authenticated = true;
          var username = this.username;
          for (let i in this.players) {
            if (username == this.players[i].email) {
              this.userLogueado = this.players[i].id;
            }
          }
        } else {
          this.clearInput();
          this.errorLogin = "Invalid email address or password!";
        }
      });

      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },

    logout() {
      let url = "https://s4lvogame.herokuapp.com";
      fetch(url + "/api/logout", {
        credentials: "include",

        method: "POST",
      }).then(response => {
        this.getData();
        if (response.status == 200) {
          this.authenticated = false;
          window.location.reload();
          this.clearInput();
        }
      });
    },
    createGame() {
      let url = "https://s4lvogame.herokuapp.com";
      fetch(url + "/api/games", {
        method: "POST",
        credentials: "include",
      })
        .then(response => {
          this.getData();

          if (response.status == 201) {
            this.authenticated = true;

            return response.json();
          } else {
            this.errorCreate = "error in creating game";
          }
        })
        .then(res => {
          if (res.id) {
            this.$router.push(`/game/gp/${res.id}`);
            //location.href = "game/gp/=" + res.id;
          }
        })
        .catch(error => console.log(error));
    },

    joinGame(gameID) {
      let url = "https://s4lvogame.herokuapp.com";
      fetch(url + "/api/game/" + gameID + "/players", {
        credentials: "include",

        method: "POST",
      })
        .then(response => response.json())
        .then(res => {
          this.$router.push({ name: "Game", params: { id: res.KEY_GPID } });
        })
        .catch(error => {
          alert("error joining the game. ", error);
        });
    },
    getGpId(game) {
      for (let i in game.gamePlayers) {
        let games = game;
        let gp = game.gamePlayers[i];
        if (gp.player.id == this.userLogueado) {
          return gp.gpId;
        }
      }
      return null;
    },
  },
  watch: {
    errorLogin() {
      setTimeout(() => {
        this.errorLogin = null;
      }, 2000);
    },
    errorSignup() {
      setTimeout(() => {
        this.errorSignup = null;
      }, 2000);
    },
    alertLogin() {
      setTimeout(() => {
        this.alertLogin = null;
      }, 1000);
    },
    errorCreate() {
      setTimeout(() => {
        this.errorCreate = null;
      }, 3000);
    },
  },

  computed: {
    showScores() {
      let table = [];
      this.players.forEach(player => {
        let playerScore = {
          player: player,
          won: 0,
          lost: 0,
          tied: 0,
          total: 0,
          email: player.email,
        };
        player.scores.forEach(scores => {
          switch (scores) {
            case 0.0:
              playerScore.lost += 1;
              break;
            case 0.5:
              playerScore.tied += 1;
              playerScore.total += scores;
              break;
            case 1:
              playerScore.won += 1;
              playerScore.total += scores;
              break;
            default:
              break;
          }
        });

        table.push(playerScore);
      });
      return table.sort((a, b) => {
        if (a.total < b.total) {
          return 1;
        } else if (a.total > b.total) {
          return -1;
        } else if (a.total == b.total) {
          return a.won + a.lost + a.tied < b.won + b.lost + b.tied;
        }
      });
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
.theme--dark.v-sheet {
  background-color: #28a745 !important;
}
.v-application .mt-5 {
  margin-top: 0px !important;
}
#input-84 {
  font-weight: bold;
}
.table td {
  font-size: 15px;
}
.table th {
  font-size: 20px;
}

.v-application--wrap {
  min-height: -webkit-fill-available !important;
}
.v-btn {
  background-color: red !important;
}
.logout {
  height: 20px !important;
  min-width: 35px !important;
}

.wait {
  color: green;
  font-size: smaller;
}
.container {
  max-width: 2000px !important;
}
.header-fixed {
  width: 100%;
}

.header-fixed > thead,
.header-fixed > tbody,
.header-fixed > thead > tr,
.header-fixed > tbody > tr,
.header-fixed > thead > tr > th,
.header-fixed > tbody > tr > td {
  display: block;
}

.header-fixed > tbody > tr:after,
.header-fixed > thead > tr:after {
  content: " ";
  display: block;
  visibility: hidden;
  clear: both;
}

.header-fixed > tbody {
  overflow-y: auto;
  height: 400px;
}

.header-fixed > tbody > tr > td,
.header-fixed > thead > tr > th {
  width: 20%;
  float: left;
}
</style>
