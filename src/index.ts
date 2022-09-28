import { run as checkUpdates } from "npm-check-updates";
import modules from "@nuxt/modules";
import type { Index } from "npm-check-updates/build/src/types/IndexType";

const upgradedModules = await checkUpdates({
  packageFile: "./package.json",
  upgrade: true,
  silent: true,
  reject: ["@nuxt/modules", "npm-check-updates"],
}) as Index<string>;

for (const module in upgradedModules) {
    if (modules[module]) {
        console.log(`Upgrading ${module} to ${upgradedModules[module]}`);
        modules[module].version = upgradedModules[module];
    }
}

