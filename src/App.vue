<template>
  <div id="app">
    <div class="body">
      <div
        id="nav"
        style="
          font-size: 45px;
          font-weight: bolder;
          height: 90px;
          display: flex;
          align-items: center;
          background: rgba(154, 205, 50, 0.77);
        "
      >
        <img
          style="width: 70px;"
          src="https://www.seekpng.com/png/full/35-353434_nuke-8-bit-yin-yang.png"
          alt=""
        />
        BATTLESHIP
        <!-- <div style="margin-left: 380px; margin-left: 385px; margin-top: auto;">
          <router-link to="/" style="padding: 5px; text-decoration: none;"
            ><a class="mdi mdi-home" style="font-size: 45px; color: black;"></a
          ></router-link>
        </div> -->
      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
import back from "./components/Back";
export default {
  components: { back },
};
</script>
<style scoped>
#app {
  font-family: "Baloo 2", cursive;
}
.body {
  background: url("https://tuswallpapersgratis.com/wp-content/uploads/2013/12/Batalla-naval-wallpaper.jpg");
  background-position: center;
  background-size: cover;
}
#nav {
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* .container {
  max-width: 1785px !important;
} */
</style>
