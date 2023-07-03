<template>
  <var-scroll-comp :scrollDataList="scrollDataList">
    <template v-slot="{scrollDataList}">
      <div style="display: flex;flex-wrap: wrap">
        <div class="scroll-block" v-for="item in scrollDataList" style="width: 48%;height: 50px;border: 1px solid skyblue;box-sizing: border-box">
          {{item.name}}
        </div>
      </div>
    </template>
  </var-scroll-comp>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import VarScrollComp from './components/VarScrollComp.vue'
import { reactive } from "vue";


const scrollDataList = reactive([])

//模拟后端数据
for (let i = 1; i <= 20000; i++) {
  scrollDataList.push({name:i})
}
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
