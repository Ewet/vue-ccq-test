<template>
  <div
    id="root"
    class="main-container view"
  >
    <div class="main-container-menu">
      <div class="box1">box1</div>
      <div class="box2">box2</div>
    </div>
    <!-- 子应用盒子 -->
    <div
      id="root-view"
      class="app-view-box"
      v-html="content"
    ></div>
  </div>
</template>

<script>
export default {
  name: "root-view",
  props: {
    loading: Boolean,
    content: String
  }
};
</script>
<style lang="less" scoped>
.box1, .box2{
  width: 200px;
  height: 200px;
  background: blue;
  border: 1px solid #999;
}
.box1,.box2{
  position: absolute;
  z-index: 1;
}
</style>
