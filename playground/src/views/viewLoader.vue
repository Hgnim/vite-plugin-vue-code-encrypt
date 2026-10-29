<script setup>
import { decryptString } from '/src/utils/cryptoString.js';
import { ref,defineAsyncComponent } from 'vue';
const rootView = () => import('/src/views/root/root.vue');

const comp = null;

const pwIpt = ref('');

async function enter_click() {
    console.log(rootView)

    const rv=(await rootView()).default;

    console.log(rv)

    const dec = decryptString(rv.enc, pwIpt.value);

    console.log(dec)

    const url = URL.createObjectURL(new Blob([dec], { type: 'text/javascript' }));

    try {
      const mod = await import(/* @vite-ignore */ url);
      comp.value = mod.default;
    } finally {
      URL.revokeObjectURL(url);
    }
}
</script>

<template>
    <div v-if="comp==null">
        <label>password:</label>
        <input type="text" v-model="pwIpt" />
        <button @click="enter_click">enter</button>
    </div>
    <component v-else :is="comp" />
</template>

<style scoped>
</style>