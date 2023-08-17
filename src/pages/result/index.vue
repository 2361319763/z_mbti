<template>
  <view class="type-main">
    <view class="type-info" :style="{backgroundColor: nation.color}">
      <h1>
        {{ nation.name }}
      </h1>
      <p class="type-rg">人格</p>
      <p style="color: black;">{{ nation.id }}</p>
      <img class="type-img" :src="nation.img" alt="">
    </view>
    <view class="type-list">
      <view class="type-item">
        <h2>{{ nation.name }}人格</h2>
        <Blockquote :data="nation.blockquote" />
        <p>{{ nation.description }}</p>
      </view>
      <view 
        class="type-item" 
        v-for="(item, index) in nation.list" 
        :key="'item_'+index"
      >
        <h2 v-if="item.title">{{ item.title }}</h2>
        <p v-if="item.text">{{ item.text }}</p>
        <Pullout v-if="item.pullout" :data="{
          color: nation.color,
          text: item.pullout
        }" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Countries from '@/api/countriesApi.json';
import Blockquote from "./components/Blockquote.vue";
import Pullout from "./components/Pullout.vue";

const pageType = ref<string>('');
const nation = ref()
onLoad((query: any) => {
  const { type } = query;
  pageType.value = type;
  nation.value = Countries[type];
  console.log(nation.value);
  
});
</script>

<style scoped lang="scss">
.type-main {
  width: 100vw;
  overflow-x: hidden;
  padding-bottom: 30px;
}
.type-info {
  padding-top: 30px;
  color: #fff;
  text-align: center;
  h1 {
    font-size: 43px;
    font-weight: 700;
  }
  p {
    font-size: 20px;
    font-weight: 600;
  }
  .type-rg {
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .type-img {
    display: block;
    width: 200%;
    height: auto;
    text-align: center;
    -webkit-clip-path: polygon(0 0, 100% 25%, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 25%, 100% 100%, 0% 100%);
    transform: translateX(-25%);
  }
}
.type-list {
  padding: 0 20px;
  .type-item {
    h2 {
      font-size: 1.4em;
      line-height: 1.5;
      margin: 20px 0 10px;
    }
    p {
      margin-top: 10px;
      line-height: 1.8;
      font-weight: 500;
    }
  }
}
</style>