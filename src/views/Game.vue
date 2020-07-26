<template>
  <div
    class="container"
    style="height: 100vh; border-radius: 35px; margin-top: 50px;"
  >
    <div style="display: flex; justify-content: center;">
      <router-link to="/">
        <button
          color="gray"
          style="font-size: 30px; font-weight: bold; color: white;"
        >
          Back <span class="mdi mdi-reply"></span></button
      ></router-link>
    </div>
    <div>
      <div style="display: flex; align-items: baseline;">
        <table
          style="
            display: flex;
            align-items: baseline;
            margin-left: 40px;
            padding-top: 20px;
          "
        >
          <thead>
            <p style="color: red; font-size: 20px; margin-right: 10px;">
              Status Game:
            </p>
          </thead>

          <tbody id="turnOpponnet">
            <p style="color: yellow; font-size: 25px;">
              {{ gameStates }}
            </p>
          </tbody>
        </table>
      </div>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        margin-top: 50px;
      "
    >
      <div class="table-responsive" style="height: 354px; width: 247px;">
        <table style="margin: auto; #228b22fc;">
          <thead class="tableHistoryHead" style="text-align: center;">
            <tr>
              <th style="width: 56px;">Turn</th>
              <th style="width: 56px;">Hits</th>
              <th style="width: 56px;">Miss</th>
            </tr>
          </thead>
          <tbody id="history" style="text-align: center;"></tbody>
        </table>
      </div>
      <div style="display: flex; margin: auto;">
        <div style="margin-right: 50px;">
          <h3 style="text-align: center; color: orange;">SHIPS</h3>
          <table id="tableShips" style="color: greenyellow; margin: auto;">
            <thead class="shipsHead">
              <tr v-for="n in cols" :key="n">
                <th></th>
                <th id="a">{{ n }}</th>
              </tr>
            </thead>

            <tbody v-if="views" style="display: table-row;">
              <tr
                v-for="row in abc"
                :key="row.id"
                @dragover.prevent
                @drop.prevent="drop"
              >
                <th id="a">{{ row }}</th>
                <td
                  v-for="(col, i) in cols"
                  :key="i"
                  :id="row + col"
                  v-show="col != 0"
                ></td>
              </tr>
            </tbody>
          </table>

          <div style="height: 0px;">
            <div
              class="drag"
              style="
                text-align: center;
                display: grid;
                justify-content: center;
                margin-left: 35px;
              "
            >
              <div>
                <div class="my-2" v-if="views && views.ships.length < 5">
                  <button
                    style="
                      margin-top: 40px;
                      margin-bottom: 25px;
                      border: outset;
                      width: 70px;
                      padding: 5px;
                      color: tomato;
                      background: black;
                    "
                    v-show="
                      saveShips[0].shipLocations != '' &&
                      saveShips[1].shipLocations != '' &&
                      saveShips[2].shipLocations != '' &&
                      saveShips[3].shipLocations != '' &&
                      saveShips[4].shipLocations != ''
                    "
                    v-if="views && views.ships.length < 5"
                    small
                    @click="shipsPost()"
                  >
                    Send
                  </button>
                </div>
              </div>
              <div>
                <div
                  v-if="views && views.ships.length < 5"
                  style="display: flex; justify-content: center;"
                >
                  <div
                    style="text-align: center; margin-right: 25px;"
                    id="ship_1"
                    class="ship1"
                    :draggable="true"
                    src="https://products.damen.com/-/media/Products/Images/Clusters-groups/Offshore-and-Transport/Platform-Supply-Vessel/PSV-3300/3D-Rendering/offshore_service_vessel.png?mw=362"
                    data-shiplength="5"
                    data-position="0"
                    data-orientation="v"
                    data-shiptype="Carrier"
                    @dragstart="dragStart"
                    @dragover.stop
                  >
                    <button
                      style="
                  font-size:7px;
                  width: 34px;
                  color: white;
                  border: outset; 
                  border-color:orange                   
                  max-width: 34px;
                   height:34px
                  max-height:34px
                "
                      class="rotationButton"
                      @click="changeShipPosition('ship_1')"
                    >
                      Carrier
                    </button>
                  </div>

                  <div
                    style="text-align: center; margin-right: 25px;"
                    id="ship_2"
                    class="ship2"
                    :draggable="true"
                    data-shiplength="4"
                    data-position="1"
                    data-shiptype="Battleship"
                    data-orientation="v"
                    @dragstart="dragStart"
                    @dragover.stop
                  >
                    <button
                      style="
                  font-size:7px;
                  width: 34px;
                  color: white;
                  border: outset; 
                  border-color:orange                   
                  max-width: 34px;
                   height:34px
                  max-height:34px
                "
                      class="rotationButton"
                      @click="changeShipPosition('ship_2')"
                    >
                      Battleship
                    </button>
                  </div>
                  <div
                    style="text-align: center; margin-right: 25px;"
                    id="ship_3"
                    class="ship3"
                    :draggable="true"
                    data-shiplength="3"
                    data-position="2"
                    data-shiptype="Submarine"
                    data-orientation="v"
                    @dragstart="dragStart"
                    @dragover.stop
                  >
                    <button
                      style="
                    font-size:7px;
                  width: 34px;
                  color: white;
                  border: outset; 
                  border-color:orange                   
                  max-width: 34px;
                   height:34px
                  max-height:34px
                "
                      class="rotationButton"
                      @click="changeShipPosition('ship_3')"
                    >
                      Submarine
                    </button>
                  </div>
                  <div
                    style="text-align: center; margin-right: 25px;"
                    id="ship_4"
                    class="ship4"
                    :draggable="true"
                    data-shiplength="3"
                    data-position="3"
                    data-shiptype="Destroyer"
                    data-orientation="v"
                    @dragstart="dragStart"
                    @dragover.stop
                  >
                    <button
                      style="
                     font-size:7px;
                  width: 34px;
                  color: white;
                  border: outset; 
                  border-color:orange                   
                  max-width: 34px;
                   height:34px
                  max-height:34px
                "
                      class="rotationButton"
                      @click="changeShipPosition('ship_4')"
                    >
                      Destroyer
                    </button>
                  </div>
                  <div
                    style="text-align: center; margin-right: 25px;"
                    id="ship_5"
                    class="ship5"
                    :draggable="true"
                    data-shiplength="2"
                    data-position="4"
                    data-shiptype="Patrol Boat"
                    data-orientation="v"
                    @dragstart="dragStart"
                    @dragover.stop
                  >
                    <button
                      style="
                     font-size:7px;
                  width: 34px;
                  color: white;
                  border: outset; 
                  border-color:orange                   
                  max-width: 34px;
                   height:34px
                  max-height:34px
                "
                      class="rotationButton"
                      @click="changeShipPosition('ship_5')"
                    >
                      Patrol Boat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-overlay v-if="alertaWin" opacity="0.1">
          <v-alert
            prominent
            style="
              padding: 10px;
              width: 220px;
              border­radius: 10px;
              background­color: #f80;
              font­size: 1.4em;
              text-align: center;
            "
          >
            {{ gameStates.toUpperCase() }}
          </v-alert>
        </v-overlay>

        <v-overlay v-if="alertaBad" opacity="0.1">
          <v-alert type="error" prominent>{{ alertaBad }}</v-alert>
        </v-overlay>
        <v-overlay v-if="alertaGood" opacity="0.1">
          <v-alert type="success" prominent>{{ alertaGood }}</v-alert>
        </v-overlay>
        <div style="margin: auto;">
          <h3 style="text-align: center; margin-top: inherit; color: orange;">
            SALVOS
          </h3>

          <table id="tableSalvoes" style="color: greenyellow;">
            <thead class="shipsHead">
              <tr v-for="n in cols" :key="n">
                <th></th>
                <th id="a">{{ n }}</th>
              </tr>
            </thead>

            <tbody v-if="views" style="display: table-row;">
              <tr v-for="row in abc" :key="row.id">
                <th id="a">{{ row }}</th>
                <td
                  v-for="(col, i) in cols"
                  @click="paintSalvoes(row + col)"
                  v-show="col != 0"
                  :key="i"
                  :id="'S' + row + col"
                ></td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center; height: 0px;">
            <button
              style="
                margin-top: 40px;
                border: outset;
                width: 70px;
                padding: 5px;
                color: tomato;
                background: black;
                margin-bottom: 25px;
              "
              @click="salvoesPost"
              v-if="
                views &&
                views.gamePlayers.length == 2 &&
                views.ships.length == 5 &&
                gameStates != 'Tie!' &&
                gameStates != 'You lose!' &&
                gameStates != 'You win!' &&
                saveSalvoes.salvoLocations[4] != null
              "
            >
              SEND
            </button>
          </div>
        </div>
      </div>
      <div style="margin: auto;">
        <div>
          <a style="font-size: large; color: darkred;">
            Opponent's ships
          </a>
        </div>

        <div
          id="Carrier"
          style="
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 18px;
            align-items: center;
            color: cyan;
          "
        >
          <img
            style="width: 80px; max-width: 80px;"
            src="https://www.pinclipart.com/picdir/big/568-5688600_diagram-clipart.png"
            alt=""
          />Carrier
        </div>

        <div
          id="Battleship"
          style="
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 18px;
            align-items: center;
            color: cyan;
          "
        >
          <img
            style="width: 80px; max-width: 80px;"
            src="https://www.pinclipart.com/picdir/big/568-5688600_diagram-clipart.png"
            alt=""
          />
          Battleship
        </div>

        <div
          id="Submarine"
          style="
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 18px;
            align-items: center;
            color: cyan;
          "
        >
          <img
            style="width: 80px; max-width: 80px;"
            src="https://www.pinclipart.com/picdir/big/568-5688600_diagram-clipart.png"
            alt=""
          />
          Submarine
        </div>

        <div
          id="Destroyer"
          style="
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 18px;
            align-items: center;
            color: cyan;
          "
        >
          <img
            style="width: 80px; max-width: 80px;"
            src="https://www.pinclipart.com/picdir/big/568-5688600_diagram-clipart.png"
            alt=""
          />Destroyer
        </div>

        <div
          id="Patrol Boat"
          style="
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 18px;
            align-items: center;
            color: cyan;
          "
        >
          <img
            style="width: 80px; max-width: 80px;"
            src="https://www.pinclipart.com/picdir/big/568-5688600_diagram-clipart.png"
            alt=""
          />Patrol Boat
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import back from "../components/Back";
export default {
  props: ["id"],
  components: { back },
  data() {
    return {
      cols: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      abc: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      views: null,
      turn: "",
      turnOpp: "",
      alertaShips: [],
      ships: [],
      history: [],
      salvoes: [],
      salvo: [],
      shipCell: " ",
      lastShipPos: "",
      gpids: "",
      gp: "",
      saveShips: [
        { shipType: "Carrier", shipLocations: [] },
        { shipType: "Battleship", shipLocations: [] },
        { shipType: "Submarine", shipLocations: [] },
        { shipType: "Destroyer", shipLocations: [] },
        { shipType: "Patrol Boat", shipLocations: [] },
      ],
      saveSalvoes: { salvoLocations: [] },
      gameStates: null,
      interval: null,
      setTime: null,
      setTime1: null,
      alertaBad: null,
      alertaGood: null,
      alertaWin: null,
      alertaLose: null,
    };
  },

  methods: {
    getData() {
      let url = "https://s4lvogame.herokuapp.com";

      axios
        .get(url + "/api/game_view/" + this.id, {
          withCredentials: true,
        })
        .then(res => {
          this.views = res.data;
          this.gp = res.data.gamePlayers;
          this.ships = res.data.ships;
          this.salvoes = res.data.salvoes;
          this.history = res.data.history;
          this.gameStates = res.data.status;
        });
    },

    shipsPost() {
      let url = "https://s4lvogame.herokuapp.com";
      fetch(url + "/api/games/players/" + this.id + "/ships", {
        method: "POST",
        credentials: "include",

        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },

        body: JSON.stringify(this.saveShips),
      })
        .then(data => {
          this.getData();
          return data.text();
        })
        .then(data => {
          this.data = data;
          this.alertaGood = "Ships successfully placed!";
        });
    },
    salvoesPost() {
      let url = "https://s4lvogame.herokuapp.com";
      fetch(url + "/api/games/players/" + this.id + "/salvoes", {
        credentials: "include",

        headers: {
          Accept: "application/json",

          "Content-type": "application/json",
        },

        method: "POST",
        body: JSON.stringify(this.saveSalvoes),
      })
        .then(data => {
          this.getData();
          this.saveSalvoes.salvoLocations = [];
          return data.text();
        })
        .then(data => {
          this.data = data;
          this.alertaGood = "Salvoes successfully fired!";
        });
    },

    getShipSalvo() {
      for (let i in this.ships) {
        let ship = this.ships[i].shipLocations;
        for (let j in ship) {
          let shipId = document.getElementById(ship[j]);
          shipId.style.backgroundColor = " black";
          shipId.style.borderColor = "orange";

          document.getElementById(ship[0]).style.color = "blue";
          document.getElementById(ship[0]).style.textAlign = "center";
          shipId.style.width = "35px";
          shipId.style.maxWidth = "35px";
          shipId.style.height = "35px";
          shipId.style.maxHeight = "35px";
          shipId.style.fontSize = "xx-small";
          for (let k in this.history) {
            let history = this.history;
            for (let l in history[k].salvosOpp) {
              if (history[k].salvosOpp[l] == ship[j]) {
                shipId.style.backgroundColor = " transparent";
                document.getElementById(history[k].salvosOpp[l]).innerHTML =
                  "<img src='https://www.pinclipart.com/picdir/big/523-5230866_clouds-explosion-dialog-png-file-hd-clipart-comic.png' width='30px' height='30px'>";
              }
            }
          }
        }
      }
      for (let i in this.salvoes) {
        let salvo = this.salvoes[i].salvoLocations;
        for (let j in salvo) {
          let salvoId = document.getElementById("S" + salvo[j]);
          salvoId.innerHTML =
            "<img src='https://www.pinclipart.com/picdir/big/549-5495536_ripples-png-png-clipart-drops-of-water-transparent.png' width='30px' height='30px'>";
          salvoId.classList.add("hits");
          salvoId.style.pointerEvents = "none";
          for (let k in this.history) {
            let history = this.history;
            for (let l in history[k].shipOpp) {
              if (history[k].shipOpp[l] == salvo[j]) {
                document.getElementById("S" + history[k].shipOpp[l]).innerHTML =
                  "<img src='https://www.pinclipart.com/picdir/big/523-5230866_clouds-explosion-dialog-png-file-hd-clipart-comic.png' width='30px' height='30px'>";
                document.getElementById(
                  "S" + history[k].shipOpp[l]
                ).style.pointerEvents = "none";
              }
            }
          }
        }
      }
    },

    drop(e) {
      let ship_id = e.dataTransfer.getData("ship");
      let ship = document.getElementById(ship_id);

      let abc = this.shipCell.slice(0, 1);
      let acbIndex = this.abc.indexOf(abc);
      let n = Number(this.shipCell.slice(1));
      this.shipCell = e.target.id.slice(0, e.target.id.length);
      if (this.checkPlace(ship) == true) {
        if (this.lastShipPos != "") {
          this.clearShip(ship);
        }
        ship.style.display = "block";
        e.target.appendChild(ship);
        this.lastShipPos = this.shipCell;

        this.paintCells(ship);
      }
    },
    dragStart(e) {
      const target = e.target;
      e.dataTransfer.setData("ship", target.id);
      e.dataTransfer.setDragImage(e.target, 0, 0);
    },
    checkPlace(ship) {
      let abc = this.shipCell.slice(0, 1);
      let acbIndex = this.abc.indexOf(abc);
      let n = Number(this.shipCell.slice(1));

      for (let i = 0; i < ship.dataset.shiplength; i++) {
        let paintV = this.abc[acbIndex + i] + n;
        let paintH = abc + (n + i);
        let types = ship.dataset.shiptype.replace(/\s/g, "");
        let cellIdH = document.getElementById(paintH);
        let cellIdV = document.getElementById(paintV);

        if (ship.dataset.orientation == "v") {
          if (document.getElementById(paintV) == null) {
            this.alertaBad = "Invalid ship location, try again!";
            return false;
          }
          if (
            cellIdV.classList.value != "" &&
            cellIdV.classList.value != types
          ) {
            this.alertaBad = "Invalid ship location, try again!";
            return false;
          }
        } else {
          if (document.getElementById(paintH) == null) {
            this.alertaBad = "Invalid ship location, try again!";
            return false;
          }
          if (
            cellIdH.classList.value != "" &&
            cellIdH.classList.value != types
          ) {
            this.alertaBad = "Invalid ship location, try again!";
            return false;
          }
        }
      }

      return true;
    },
    paintCells(ship) {
      let abc = this.shipCell.slice(0, 1);
      let acbIndex = this.abc.indexOf(abc);
      let n = Number(this.shipCell.slice(1));
      this.saveShips[Number(ship.dataset.position)].shipLocations = [];
      for (let i = 0; i < ship.dataset.shiplength; i++) {
        let types = ship.dataset.shiptype.replace(/\s/g, "");
        let paintV = this.abc[acbIndex + i] + n;
        let paintH = abc + (n + i);
        let cellIdH = document.getElementById(paintH);
        let cellIdV = document.getElementById(paintV);

        if (ship.dataset.orientation == "v") {
          cellIdV.classList.add(types);

          this.saveShips[Number(ship.dataset.position)].shipLocations.push(
            paintV
          );
        }

        if (ship.dataset.orientation == "h") {
          cellIdH.classList.add(types);
          this.saveShips[Number(ship.dataset.position)].shipLocations.push(
            paintH
          );
        }
      }
    },
    clearShip(ship) {
      let abc = this.lastShipPos.slice(0, 1);
      let acbIndex = this.abc.indexOf(abc);
      let n = Number(this.lastShipPos.slice(1));
      let type = ship.dataset.shiptype.replace(/\s/g, "");
      let shipClass = ship.dataset.orientation == "v" ? "." + type : "." + type;
      [...document.querySelectorAll(shipClass)].forEach(cell => {
        cell.classList.remove(shipClass.slice(1));
      });
    },
    changeShipPosition(id) {
      let ship = document.getElementById(id);
      this.shipCell = ship.parentElement.id.slice(
        0,
        ship.parentElement.id.length
      );
      let types = ship.dataset.shiptype.replace(/\s/g, "");
      let n = id.slice(id.length - 1);
      let orientation = ship.dataset.orientation;
      if (orientation == "h") {
        ship.dataset.orientation = "v";
      } else {
        ship.dataset.orientation = "h";
      }
      if (this.checkPlace(ship) == true) {
        this.clearShip(ship);
        this.paintCells(ship);
      } else {
        ship.dataset.orientation = orientation;
      }
    },
    paintSalvoes(id) {
      let salvoPaint = this.saveSalvoes.salvoLocations.indexOf(id);
      if (
        this.saveSalvoes.salvoLocations.length <= 5 &&
        !this.gameStates.includes("wins") &&
        !this.gameStates.includes("tie")
      ) {
        if (
          document.getElementById("S" + id).innerText.length < 1 &&
          document.getElementById("S" + id).classList.contains("salvo")
        ) {
          document.getElementById("S" + id).classList.remove("salvo");
          document
            .getElementById("S" + id)
            .removeChild(document.getElementById("S" + id).childNodes[0]);
          this.saveSalvoes.salvoLocations.splice(salvoPaint, 1);
        } else if (
          document.getElementById("S" + id).innerText.length < 1 &&
          this.saveSalvoes.salvoLocations.length != 5
        ) {
          document.getElementById("S" + id).classList.add("salvo");
          this.saveSalvoes.salvoLocations.push(id);
          document.getElementById("S" + id).innerHTML =
            "<img src='https://cdn.pixabay.com/photo/2016/03/31/18/17/bomb-1294261_1280.png' width='30px' height='30px'>";
        }
      } else {
        this.alertaBad = this.gameStates;
      }
    },
    paintHistory() {
      let body = document.getElementById("history");
      let turnTable = document.getElementById("turnOpponnet");
      for (let i in this.history) {
        let hitsAndMiss = this.history[i].hitsAndMiss;
        for (let j in hitsAndMiss.type) {
          var hits = document.getElementById(hitsAndMiss.type[j]);
          hits.classList.add("sunk");

          document.getElementById(hitsAndMiss.type[j]).innerHTML =
            "<img src='https://www.pinclipart.com/picdir/big/65-650669_vector-illustration-of-sinking-titanic-cruise-ship-inspector.png' width='50px'>";
        }
        var tr = document.createElement("tr");
        var tr1 = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("p");
        td.append(this.history[i].turn);
        this.turn = this.history[i].turn;

        td.style.width = "56px";
        td.style.border = "solid";
        td1.append(hitsAndMiss.hits.length);
        td1.style.width = "56px";
        td1.style.border = "solid";
        td2.append(hitsAndMiss.miss.length);
        td2.style.width = "56px";
        td2.style.border = "solid";

        tr.append(td);
        tr.append(td1);
        tr.append(td2);
        body.append(tr);
      }
    },
    gameOver() {
      if (
        this.gameStates.includes(" wins!") ||
        this.gameStates.includes("Tie!")
      ) {
        this.alertaWin = "";

        this.alertaWin = this.gameStates.toUpperCase();
      }
    },
  },
  watch: {
    views() {
      setTimeout(() => {
        this.getShipSalvo();
        var body = document.getElementById("history");
        var tableRows = body.getElementsByTagName("tr");
        for (let i = tableRows.length - 1; i >= 0; i--) {
          body.removeChild(tableRows[i]);
        }
        if (this.views.hasOwnProperty("history")) {
          this.paintHistory();
        }
      }, 1);
    },

    gameStates() {
      if (
        this.gameStates.includes("opponent") ||
        this.gameStates.includes("'s turn")
      ) {
        this.interval = setInterval(() => {
          this.getData();
        }, 1000);
      } else {
        this.gameOver();
        clearInterval(this.interval);
      }
    },
    alertaBad() {
      setTimeout(() => {
        this.alertaBad = null;
      }, 3000);
    },
    alertaGood() {
      setTimeout(() => {
        this.alertaGood = null;
      }, 3000);
    },
    alertaWin() {
      setTimeout(() => {
        this.alertaWin = null;
      }, 2000);
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
};
</script>

<style scoped>
.container {
  max-width: 1320px !important;
  background: #2f4f4fe0 !important;
}
.sunk {
  text-decoration: line-through;
  text-decoration-color: red;
  text-decoration-style: wavy;
}
.hits {
  text-align: center;
  font-size: xx-large;
}

.tableHistoryHead {
  margin-left: 0px;
}
.mdi-sail-boat::before {
  position: absolute;
}
.Carrier {
  background: black;
  border: outset !important;
  width: 35px !important;
  height: 35px !important;
  max-width: 35px !important;
  max-height: 35px !important;
  border-color: orange !important;
}
.Submarine {
  background: black;
  border: outset !important;
  width: 35px !important;
  height: 35px !important;
  max-width: 35px !important;
  max-height: 35px !important;
  border-color: orange !important;
}
.Destroyer {
  background: black;
  border: outset !important;
  width: 35px !important;
  height: 35px !important;
  max-width: 35px !important;
  max-height: 35px !important;
  border-color: orange !important;
}
.Battleship {
  background: black;
  border: outset !important;
  width: 35px !important;
  height: 35px !important;
  max-width: 35px !important;
  max-height: 35px !important;
  border-color: orange !important;
}
.PatrolBoat {
  background: black;
  border: outset !important;
  width: 35px !important;
  height: 35px !important;
  max-width: 35px !important;
  max-height: 35px !important;
  border-color: orange !important;
}

#salvoes {
  display: flow-root !important;
}
#a {
  padding: 0px !important;

  font-size: large;
}

.typeLocat {
  margin-right: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.typeLocat li {
  margin: 25px;
}

#tableShips td {
  width: 35px;
  height: 35px;
  max-width: 35px;
  max-height: 35px;
  font-size: 10px;
  border: groove;
}
#tableSalvoes td {
  width: 35px;
  height: 35px;
  max-width: 35px;
  max-height: 35px;
  font-size: 10px;
  border: groove;
}

.shipsHead {
  display: flex;
  justify-content: space-between;
}
.salvosHead {
  display: flex;
  justify-content: space-between;
}
.none {
  background: snow !important;
  color: cadetblue;
  font-size: large;
}
.v-data-table {
  max-height: 0px !important;
  width: 555px !important;
}
.tableHistoryHead th {
  border: solid;
}
.salvo {
  background: transparent;
}
</style>
