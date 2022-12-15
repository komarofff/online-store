<template>
  <footer class="footer">
    <div class="container footer__box">
      <div>Link to github</div>
      <div>2022</div>
      <div>link to rsschool</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
};
</script>

<style scoped lang="scss">
.footer {
  background-color: rgba(0, 0, 0, 0.3);
  padding-top: 20px;
  padding-bottom: 20px;
}
.footer__box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
