import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import vueCodeEncrypt from "../dist/vite-plugin-vue-code-encrypt.es.js";

export default defineConfig({
    plugins: [
        vue(),
        vueCodeEncrypt({
            targetFile: 'root.vue',
            password: 'test',
        }),
    ],
});