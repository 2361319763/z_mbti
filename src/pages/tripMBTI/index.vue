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

    <p class="trip-question">
      {{ questionList[currentSlide].question }}
    </p>

    <view class="trip-btn-box">
      <up-button 
        class="trip-btn"
        v-for="(item, index) in questionList[currentSlide].answers" 
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
const firstPart = Questions.firstPart;
const thirdPart = Questions.thirdPart;
const questionList = [...firstPart, ...thirdPart];
const TOTAL_SLIDES = firstPart.length + thirdPart.length;

mbti.value = Array(TOTAL_SLIDES).fill("");

const nextSlide = (type: string) => {
  mbti.value[currentSlide.value] = type;
  if (currentSlide.value < TOTAL_SLIDES-1) {
    currentSlide.value ++;
  } else {
    loading.value = true;
    mbtiChecker();
  }
}

const upSlide = () => {
  currentSlide.value --;
}

const mbtiChecker = () => {
    let typeObj = {
      "X1":0, "X2":0, "X3":0, "X4":0, "X5":0, "X6":0, "X7":0, "X8":0, 
      "Z1":0, "Z2":0, "Z3":0, "Z4":0, "Z5":0, "Z6":0, "Z7":0, "Z8":0,
    };
    let result = {
      J: 0, P: 0, S: 0, N: 0, E: 0, I: 0, F: 0,
      T: 0, IE: 0, SN: 0, TF: 0, PJ: 0
    };
    let examResult = '';

    mbti.value.forEach(J=>{
      if (typeObj[J]) {
        typeObj[J]++
      } else {
        typeObj[J] = 1;
      }
    })

    result.J = typeObj.X1 + typeObj.Z1;
    result.P = typeObj.X2 + typeObj.Z2;
    result.S = typeObj.X3 + typeObj.Z3;
    result.N = typeObj.X4 + typeObj.Z4;
    result.E = typeObj.X5 + typeObj.Z5;
    result.I = typeObj.X6 + typeObj.Z6;
    result.F = typeObj.X7 + typeObj.Z7;
    result.T = typeObj.X8 + typeObj.Z8;
    
    if(result.I>result.E) {
      examResult += 'I';
    } else {
      examResult += 'E';
    };
    if(result.S>result.N) {
      examResult += 'S';
    } else {
      examResult += 'N';
    };
    if(result.T>result.F) {
      examResult += 'T';
    } else {
      examResult += 'F';
    };
    if(result.P>result.J) {
      examResult += 'P';
    } else {
      examResult += 'J';
    };
    
    result.IE = result.I + result.E;
    result.SN = result.S + result.N;
    result.TF = result.T + result.F;
    result.PJ = result.P + result.J;
    console.log(result,typeObj);
    
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
  word-break:break-all;
  word-wrap:break-word;
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