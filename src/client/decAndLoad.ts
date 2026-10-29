import * as Vue from "vue";
import { loadModule } from "vue3-sfc-loader";
import { decryptStringToString } from "ez-encrypt";
import { type EncVueFile } from "../types/types";

export function decryptVueSource(
    encVs:string,
    password: string,
): string {
    return decryptStringToString(encVs, password);
}

export async function loadSFC(
    encSrc: string,
    sourceSrc: string,
    password: string,
    extraOptions: Record<string, unknown> = {},
): Promise<Vue.Component> {
    return loadModule(sourceSrc, {
        moduleCache: { vue: Vue },

        async getFile(url: string): Promise<string> {
            const res = await fetch(encSrc);
            if (!res.ok)
                throw new Error(`加载加密文件失败，状态码：${res.status}`);
            const evf: EncVueFile = await res.json();
            const decvs = decryptVueSource(evf.enc, password);
            console.log(evf, decvs);
            return decvs;
        },

        addStyle(textContent: string) {
            const style = Object.assign(document.createElement("style"), {
                textContent,
            });
            const ref = document.head.getElementsByTagName("style")[0] || null;
            document.head.insertBefore(style, ref);
        },

        ...extraOptions,
    }) as Promise<Vue.Component>;
}
