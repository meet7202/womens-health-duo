import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { legacyJpegRedirectTarget } from "../src/imageRedirect.ts";

describe("legacyJpegRedirectTarget", () => {
  it("maps class and thumbnail JPEGs onto the WebP file", () => {
    assert.equal(
      legacyJpegRedirectTarget(
        new URL("https://womenshealthduo.com/images/classes/prenatal-class-4.jpg"),
      ),
      "https://womenshealthduo.com/images/classes/prenatal-class-4.webp",
    );
    assert.equal(
      legacyJpegRedirectTarget(
        new URL("https://www.womenshealthduo.com/images/hub-thumbs/ig-csrgq9lnlt-.JPG?v=1"),
      ),
      "https://www.womenshealthduo.com/images/hub-thumbs/ig-csrgq9lnlt-.webp?v=1",
    );
  });

  it("leaves current WebP files and other JPEGs alone", () => {
    assert.equal(
      legacyJpegRedirectTarget(
        new URL("https://womenshealthduo.com/images/classes/prenatal-class-4.webp"),
      ),
      null,
    );
    assert.equal(
      legacyJpegRedirectTarget(
        new URL("https://womenshealthduo.com/images/og-womens-health-duo.jpg"),
      ),
      null,
    );
    assert.equal(
      legacyJpegRedirectTarget(new URL("https://womenshealthduo.com/images/dr-zalak-shah.jpg")),
      null,
    );
  });
});
