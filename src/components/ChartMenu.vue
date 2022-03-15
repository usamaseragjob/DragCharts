<template>
  <a-dropdown :trigger="['click']" class="menu-icon">
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      <a-icon type="ellipsis" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item key="0"> Edit </a-menu-item>
      <a-menu-item key="1" @click="this.deleteItem"> Delete </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  methods: {
    deleteItem() {
      this.$emit("ClickForDelete");
    },
  },
};
</script>
<style scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
.menu-icon {
  line-height: 1;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 40px;
  z-index: 1000;
}
</style>
