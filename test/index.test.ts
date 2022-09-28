import { expect, it, describe } from "vitest";
import * as nmu from "../src";

describe("nmu", () => {
  it("can detect a bad link", async () => {
    const message = `Hello guys check out my Call of Duty gameplay!!! 
    https://dlscord-egfits.com/fromsteamnitro`;
    expect(await osiris.checkString(message, nmu.regexes))
      .toMatchInlineSnapshot(`
      true
    `);
  });
});
