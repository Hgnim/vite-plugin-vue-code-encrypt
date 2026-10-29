//external
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dts from "vite-plugin-dts";
import pkg from "./package.json";
//import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        //vue(),
        dts({
            include: ["src"],
            outDirs: "./dist/external",
            tsconfigPath: "./tsconfig.json",
        }),
    ],
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, "src/index.ts"),
                client: path.resolve(__dirname, "src/client/index.ts"),
            },
            //name: projName,
            //fileName: (format) => `${projName}.${format}.js`,
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                ...Object.keys(pkg.dependencies ?? {}),
                ...Object.keys(pkg.peerDependencies ?? {}),
            ],
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
                assetFileNames: "[name][extname]",
            },
        },
        //源码映射
        sourcemap: true,
        //压缩
        minify: true,
        outDir: "dist/external",
    },
});
