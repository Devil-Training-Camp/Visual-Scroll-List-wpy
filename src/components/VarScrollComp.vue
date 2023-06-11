<template>
  <!--  外边的可视区域-->
  <div class="scroll-box" @scroll.lozy="monitorScroll" ref="scrollBox">
    <!--    元素盒子-->
    <div class="inner-box">
      <slot :scrollDataList="scrollDataList"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps, onMounted, ref, watch, withDefaults} from "vue";
import type {Ref} from "vue";

interface Props {
  //滚动视图盒子的高度 
  scrollBoxHeight?: string,
  //滚动试图盒子的宽度
  scrollBoxWidth?: string,
  scrollDataList: Array<T>
}

const props = withDefaults(defineProps<Props>(), {
  scrollBoxHeight: '800px',
  scrollBoxWidth: '800px',
  scrollDataList: () => [{}]
})
let scrollDataList: Ref<Array<object>> = ref([{}]);
//外部盒子实例
const scrollBox: Ref<Element | null> = ref(null);
let scrollOffsetHeight: Ref<string> = ref('');
//获取外围元素
let scrollCont: Element | null;
//每个循环元素的宽度
let containerWidth: number | undefined;
//每个循环元素的高度
let containerHeight: number | undefined;
//开始索引
let startIndex: number | undefined;
//结束索引
let endIndex: number | undefined;
//最外围可视区域高度
let height: number | undefined;
//最外围可视区域宽度
let width: number | undefined;

function scrollBox1(): void {
  document.querySelector('.inner-box').style.height = (props.scrollDataList.length * containerHeight) / (Math.floor(width / containerWidth)) + 'px'
}

//根据每个元素的高度和可视高度来计算最开始渲染多少条数据
function initScrollDataList(): Array<object> {
  //初始化索引下标
  startIndex = 0;
  endIndex = Math.floor((height / containerHeight)) * Math.floor((width / containerWidth))
  return props.scrollDataList.slice(startIndex, endIndex);
}

//滚动事件
function monitorScroll(e) {
  scrollOffsetHeight.value = e.target.scrollTop + 'px';
  if (!e.target.scrollTop) {
    startIndex = 0;
  } else {
    startIndex = Math.floor((e.target.scrollTop / containerHeight)) * Math.floor((width / containerWidth));
  }
  endIndex = Math.floor((height / containerHeight)) * Math.floor((width / containerWidth)) + startIndex;

  //当滚动距离到了页面最底部直接显示全部，因为滚动还占了800像素所以要-800
  if (e.target.scrollTop == ((props.scrollDataList.length * containerHeight) / (Math.floor(width / containerWidth)) - 800)) {
    return scrollDataList.value = props.scrollDataList.slice(startIndex, endIndex + 2);
  }
  scrollDataList.value = props.scrollDataList.slice(startIndex, endIndex);
}

//初始化元素渲染内容盒子
function initElement(): Element | never {
  const childrenElement: Element | null = document.querySelector('.scroll-block');
  if (!childrenElement) {
    throw new Error('required .scroll-block class');
  } else {
    return childrenElement
  }
}

onMounted(() => {
  //初始化
  scrollCont = document.querySelector('.inner-box').children[0];
  const childrenElement: Element = initElement();
  //循环元素容器的宽
  containerWidth = childrenElement?.offsetWidth;
  //循环元素容器的高
  containerHeight = childrenElement?.offsetHeight;
  //最外围视图的高
  height = scrollBox.value?.offsetHeight;
  //最外围视图的宽
  width = scrollBox.value?.offsetWidth;
  //初始化滑动列表的高度
  scrollBox1();
  //初始化渲染多少条数据
  scrollDataList.value = initScrollDataList();
})

watch(() => scrollOffsetHeight.value, (value) => {
  scrollCont.style.transform = 'translateY(' + value + ')'
})
</script>
<style scoped>
.scroll-box {
  width: v-bind('props.scrollBoxWidth');
  height: v-bind('props.scrollBoxHeight');
  border: 1px solid red;
  overflow-y: auto;
}

.inner-box {
  height: v-bind('innerHeight');
}

.bor-red {
  border: 1px solid skyblue;
}
</style>