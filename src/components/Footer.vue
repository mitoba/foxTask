<template>
  <footer>
    <p>Copyright &copy; 2021</p>
    <router-link to="/about">About</router-link>
  </footer>
  <div class="days">
    <span>Time left in the year:</span>
  </div>
  <CountDown deadline="2022-12-12 00:00:00" :flipAnimation="false" />
</template>

<script>
import CountDown from "./CountDown.vue";

export default {
  components: {
    CountDown,
  },
};
</script>

<style scoped>
a {
  color: #333;
}
footer {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.days {
  color: goldenrod;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>