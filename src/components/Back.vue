<template>
  <div style="display: flex; justify-content: center;">
    <button
      color="gray"
      @click="goBack()"
      style="font-size: 30px; font-weight: bold; color: white;"
    >
      Back <span class="mdi mdi-reply"></span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["back"],
  methods: {
    goBack() {
      window.history.go(-1);
    },
  },
};
</script>

<style></style>
