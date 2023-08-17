<template>
  <view class="description-pullout" :style="`background: ${data.color};`">
    <p>{{ data.text }}</p>
  </view>
</template>

<script setup lang="ts" name="Pullout">
const peops = defineProps({
  data: {
    type: Object,
    default: () => ({
      color: "",
      text: ""
    })
  }
})

const { data } = toRefs(peops);
</script>

<style scoped lang="scss">
.description-pullout {
  color: #fff;
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 10px;
  padding: 35px 30px 40px;
  clip-path: polygon(0 6%,13% 2%,65% 0,100% 5%,100% 96%,86% 100%,54% 97%,25% 100%,0 97%,0 77%);
}
</style>