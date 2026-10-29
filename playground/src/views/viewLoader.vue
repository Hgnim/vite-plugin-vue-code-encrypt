<script setup>
import { ref } from "vue";
//import type { Component,Ref } from "vue";
import { loadSFC } from "/../dist/bundle/client.js";
//import { loadSFC } from './decAndLoad';

const password = ref("");
const component/*:Ref<Component|null>*/ = ref(null);
const error = ref("");
const loading = ref(false);

async function unlock() {
  //console.log(password.value);
  if (!password.value) {
    error.value = "输入密码";
    return;
  }
  error.value = "";
  loading.value = true;
  try {
    component.value = await loadSFC('/encVueSource/root.enc.json',"/src/views/root/root.vue", password.value);
  } catch (e) {
    error.value = e.message ;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div v-if="component">
   <component :is="component" />
   </div>
  <div v-else>
    <input v-model="password" type="text" placeholder="输入密码" @keyup.enter="unlock" />
    <button @click="unlock" :disabled="loading">{{ loading ? "解密中……" : "解锁" }}</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>