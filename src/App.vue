<template>
  <div>
    <navBar></navBar>
    <router-view class="wrapper"></router-view>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar";
export default {
  name: "app",
  components: {
    navBar
  }
};
</script>

<style>
  .wrapper {
    background-color: #F8FAFF;
  }
</style>
