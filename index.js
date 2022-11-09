import modules from "@nuxt/modules" assert { type: "json" };
import pkg from "./modules.package.json" assert { type: "json" };
import pacote from "pacote";

import fs from "node:fs/promises";
import semver from "semver";

import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
	appSecret: process.env.TWITTER_APP_TOKEN,
	
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function main() {
  const newDeps = {};

  for (const { npm, description, website } of modules.slice(0, 2)) {
    const { version } = await pacote.manifest(npm);
    const cachedVersion = pkg.dependencies[npm];

    // if the module can't be found in the cache
    if (!cachedVersion) {
      console.log("New module!", npm);
      await client.v2.tweet(
				`A new Nuxt module (${npm}) has been published!
				${description}
				${website}`
      );
      newDeps[npm] = version;
    } // else if NPM version is greater than the cached one
    else if (semver.gt(version, cachedVersion)) {
      console.log("New version!", npm);
      await client.v2.tweet(`${npm} has been updated to ${version}!`);
      newDeps[npm] = version;
    }
  }
  // merge the deps object with the new deps
  Object.assign(pkg.dependencies, newDeps);

  // save it back.
  await fs.writeFile("./modules.package.json", JSON.stringify(pkg, null, "\t"));
}

main().catch(console.err);
