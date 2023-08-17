<template>
  <view class="content">
    <view class="hoomr-top">
      <view class="top-text">
        <h1>我们的读者说16型人格如此准确，</h1>
        <h1>“简直令人毛骨悚然。”</h1>
        <p>得到一个具体而准确的对自己的描述，了解你行事方式背后的原因。</p>
      </view>

      <up-button 
        shape="circle"
        text="" 
        class="custom-style" 
        @click="startTrip"
      >
        参加测试
        <u-icon name="arrow-rightward" color="#FFF" size="30" style="margin-left: 10px;"></u-icon>
      </up-button>
    </view>

    <view class="scene">
      <img width="377" height="201" srcset="https://www.16personalities.com/static/images/homepage/header-mountains-mobile.svg 768w, https://www.16personalities.com/static/images/homepage/header-mountains-desktop.svg 1600w" sizes="(max-width: 768px) 100vw, 100vw" src="https://www.16personalities.com/static/images/homepage/header-mountains-desktop.svg" alt="A group of friends having a picnic around a fire, with trees and mountains in the background">
    </view>
  </view>
</template>

<script setup lang="ts">

const startTrip = () => {
  uni.navigateTo({
    url: "/pages/tripMBTI/index"
  });
}
</script>

<style scoped lang="scss">
.content {
  color: #fff;
  height: 100vh;
}
.hoomr-top {
  background-color: #4298b4;
  padding: 40px 15px;
  height: calc(100vh - 200px);
  .top-text {
    margin-bottom: 100px;
    h1 {
      color: #fff;
      font-size: 1.2em;
      margin-bottom: 10px;
      letter-spacing: -.5px;
      margin-top: 0;
    }
    p {
      max-width: unset;
      font-size: 1.125em;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
.scene {
  height: 100px;
  overflow: hidden;
  margin-top: -1px;
  img {
    display: block;
    height: auto;
    width: 100vw;
  }
}
.custom-style {
  background-color: #88619a;
  border-color: #88619a;
  height: 60px;
  padding: 14px 40px;
  color: #fff;
  font-weight: 600;
  width: 200px;
  font-size: 18px;
  margin-left: 0;
}
</style>
