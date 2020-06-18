<template>
  <div
    id="root"
    class="main-container"
  >
    <div class="main-container-menu">
      kkkkkkkkkkkkkkkk
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
