import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import vueCodeEncrypt from "../dist/bundle/index.js";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        vue(),
        vueCodeEncrypt({
            targets: [
                {
                    name: 'root',
                    filePath: path.resolve(__dirname, "src/views/root/root.vue"),
                    password: 'test',
                }
            ],
            root: __dirname,
        }),
    ],
});