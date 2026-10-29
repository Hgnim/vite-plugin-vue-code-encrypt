/*import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";*/
import { encryptStringToString } from "ez-encrypt";
import { type EncVueFile } from "./types/types";
//import { inlineScripts, inlineStyles } from "./ts/vueInline";

export default async function vueCodeEncrypt(opt: {
    targets: {
        name: string;
        filePath: string;
        password: string;
    }[],
    root:string,
    outDir?: string,
}) {
    /*const { readFileSync, writeFileSync, mkdirSync } = await import("fs");
    const { join } = await import("path");*/
    /*const fs = await import("fs");
    console.log(
        typeof fs.readFileSync,
        typeof fs.writeFileSync,
        typeof fs.mkdirSync,
    );
    const path = await import("path");
    console.log(typeof path.join);*/
    const fs = process.getBuiltinModule("node:fs") as typeof import("node:fs");
    const path = process.getBuiltinModule("node:path",) as typeof import("node:path");
    //const { encryptStringToString } = await import("ez-encrypt");

    if (opt.outDir === undefined) opt.outDir = "public/encVueSource";

    return {
        name: "vueCodeEncrypt",
        apply: "build",
        buildStart() {
            fs.mkdirSync(opt.outDir, { recursive: true });

            for (const { name, filePath, password } of opt.targets) {
                if (!password)
                    throw new Error(
                        `[vueCodeEncrypt] 目标 ${name} 缺少 password`,
                    );

                let sourceContent = fs.readFileSync(filePath, "utf8");

                /*sourceContent = inlineScripts(sourceContent,
                    path.resolve(opt.root, filePath),
                    opt.root,
                );//将外部脚本进行内联
                sourceContent = inlineStyles(
                    sourceContent,
                    path.resolve(opt.root, filePath),
                    opt.root,
                );//将外部样式表进行内联*/

                const outPath = path.join(opt.outDir, `${name}.enc.json`);
                const encContent = encryptStringToString(
                    sourceContent,
                    password,
                );

                fs.writeFileSync(
                    outPath,
                    JSON.stringify({
                        enc: encContent,
                    } as EncVueFile),
                );

                console.log(
                    `[vueCodeEncrypt] 加密完成： ${filePath} ==> ${outPath}`,
                );
            }
        },
    };
}
