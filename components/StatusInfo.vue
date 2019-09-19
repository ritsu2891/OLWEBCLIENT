<template>
  <div class="statusInfo shadow">
    <div class="statusInfo__status">問題なし</div>
    <div class="statusInfo__description">列車に異常は検知されていません</div>
  </div>
</template>
<style lang="scss">
.statusInfo {
  margin-left: 30px;
  padding: 25px;
  background-color: rgb(245, 245, 245);

  &__status {
    font-size: 60px;
    text-align: center;
  }
  &__description {
    font-size: 30px;
  }
}
</style>