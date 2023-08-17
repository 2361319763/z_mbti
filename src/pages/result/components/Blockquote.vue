<template>
  <view>
    <view class="line">
      <text>
        {{ data.content }}
      </text>
    </view>
    <view>
      <text class="author">
        {{ data.author }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts" name="blockquote">
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      content: "",
      author: ""
    })
  }
})

const { data } = toRefs(props);
console.log(data);

</script>

<style scoped lang="scss">
.line {
  padding: 0.1rem 1.5rem;
  border-left-width: 0.3rem;
  border-left-style: solid;
  border-color: #42b983;
  margin: 1rem 0;
}
.author {
  color: #b5b5b5;
  text-transform: uppercase;
}
</style>