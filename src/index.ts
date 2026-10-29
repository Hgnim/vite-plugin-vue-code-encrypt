import { encryptStringToString } from "ez-encrypt";

export default function vueCodeEncrypt(opt: { targetFile: any; password: string }) {
    return {
        name: "vueCodeEncrypt",
        apply: "build",
        generateBundle(_, bundle) {
            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (
                    chunk.type !== "chunk" ||
                    !chunk.facadeModuleId?.includes(opt.targetFile)
                )
                    continue;
                
                /*chunk.code = chunk.code.replace(
                    /(\bfrom\s*["']|import\s*["'])(\.\/[^"']+)(["'])/g,
                    (_, pre, rel, post) => {
                        // 去掉开头的 ./，拼到 /assets/ 下
                        const abs = "/assets/" + rel.replace(/^\.\//, "");
                        return `${pre}${abs}${post}`;
                    },
                );*/

                const encrypted = encryptStringToString(chunk.code, opt.password);

                chunk.code = `export default ${JSON.stringify({
                    enc: encrypted,
                })};`;
            }
        },
    };
}
