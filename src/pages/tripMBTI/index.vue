<template>
  <view>
    <view class="trip-top">
      <h2>MBTI人格测试</h2>
      <view class="tip-box">
        <img src="https://www.16personalities.com/static/images/test-header-2.svg" alt="">
        <text class="tip-text">
          诚实回答（即使你不喜欢这个答案）。
        </text>
      </view>
    </view>

    <h2 class="tirp-progress">
      <text class="current-text">{{ currentSlide + 1 }}</text>
      <text>/{{ TOTAL_SLIDES }}</text>
    </h2>

    <view class="trip-question">
      {{ Questions[currentSlide].question }}
    </view>

    <view class="trip-btn-box">
      <up-button 
        class="trip-btn"
        v-for="(item, index) in Questions[currentSlide].answers" 
        :key="'options_'+index"
        shape="circle"
        :color="mbti[currentSlide]==item.type?'#33a474':''"
        @click="nextSlide(item.type)"
      >
        {{ item.content }}
      </up-button>
    </view>

    <view v-if="currentSlide!=0" class="up-box">
      <up-button class="up-btn" color="#88619a" @click="upSlide">上一题</up-button>
    </view>

    <u-loading-page 
      :loading="loading" 
      icon-size="50" 
      bg-color="#e8e8e8" 
      color="#33a474" 
      loading-text="loading..."
    ></u-loading-page>
  </view>
</template>

<script setup lang="ts">
import Questions from "@/api/questionsApi.json";

const loading = ref(false);
const currentSlide = ref(0);
const mbti = ref<any[]>([]);
const TOTAL_SLIDES = Questions.length;

mbti.value = Array(TOTAL_SLIDES).fill("");

const nextSlide = (type: string) => {
  mbti.value[currentSlide.value] = type;
  if (currentSlide.value < TOTAL_SLIDES-1) {
    currentSlide.value ++;
  } else {
    loading.value = true;
    mbtiChecker()
  }
}

const upSlide = () => {
  currentSlide.value --;
}

const mbtiChecker = () => {
    let map = {};
    let result: any[] = [];
    for (let i = 0; i < mbti.value.length; i++) {
      if (mbti.value[i] in map) {
        map[mbti.value[i]] += 1;
      } else {
        map[mbti.value[i]] = 1;
      }
    }
    for (let count in map) {
      if (map[count] >= 2) {
        result.push(count);
      }
    }
    const examResult = result.join('');
    setTimeout(() => {
      uni.navigateTo({
        url: `/pages/result/index?type=${examResult}`
      });
    }, 1500);
};
</script>

<style scoped lang="scss">
.trip-top{
  background-color: #33a474;
  padding: 40px 15px;
  text-align: center;
  color: #fff;
  .tip-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    background-color: rgba(255,255,255,.8);
    border-radius: 10px;
    padding: 10px;
    img {
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }
    .tip-text {
      color: #576071;
      font-size: .8em;
      font-weight: 600;
    }
  }
}
.tirp-progress {
  padding: 40px 20px 20px;
  color: #e8e7e6;
  .current-text {
    color: #33a474;
    font-size: 1.5em;
  }
}

.trip-question {
  padding: 0 20px;
  color: #4e4e4e;
  font-size: 1.4rem;
  font-weight: bolder;
}

.trip-btn-box {
  padding: 20px 50px;
  .trip-btn {
    margin: 20px 0;
    padding: 20px;
    height: 50px;
    line-height: 1.2;
  }
}

.up-box {
  position: absolute;
  width: 100vw;
  bottom: 30px;
}
.up-btn {
  width: 50vw;
  font-size: 16px;
  font-weight: 600;
}
</style>