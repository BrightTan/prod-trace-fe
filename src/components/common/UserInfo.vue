<template>
  <div class="user-info">
    <el-avatar
      shape="square"
      :size="45"
      src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    ></el-avatar>
    <div class="user">{{ $store.state.userInfo.username }}</div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
};
</script>
<style lang="scss" scoped>
.user-info {
  height: 100%;
  display: flex;
  align-items: center;
  .user {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
