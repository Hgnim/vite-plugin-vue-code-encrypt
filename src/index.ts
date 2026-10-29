import { encryptStringToString } from "ez-encrypt";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

export default function vueCodeEncrypt(opt: {
    targets: {
        name: string;
        filePath: any;
        password: string;
    }[],
    outDir?:string,
}) {
    if (opt.outDir === undefined) 
        opt.outDir = "public/encVueSource";


    return {
        name: "vueCodeEncrypt",
        apply: "build",
        buildStart() {
            mkdirSync(opt.outDir, { recursive: true });

            for (const { name, filePath, password } of opt.targets) {
                if (!password)
                    throw new Error(`[vueCodeEncrypt] 目标 ${name} 缺少 password`);

                const sourceContent = readFileSync(filePath, "utf8");
                const outPath = join(opt.outDir, `${name}.enc.json`);
                const encContent = encryptStringToString(sourceContent, password);

                writeFileSync(outPath, JSON.stringify(
                    {
                        enc: encContent,
                    }
                ));

                console.log(`[vueCodeEncrypt] 加密完成： ${filePath} ==> ${outPath}`);
            }
        },
    };
}
