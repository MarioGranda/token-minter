import { getChecksumAddress } from "../checksumAddress";

describe("checksumAddress", () => {
  it("should return the checksum address", () => {
    const ethAddress = "0xf3a82eb87f58a122ba2ff4e56dbf355361f215a4";
    const checksumAddress = getChecksumAddress(ethAddress);
    expect(checksumAddress).toEqual(
      "0xf3a82EB87F58a122bA2Ff4e56dBf355361f215a4"
    );
  });

  it("should return an empty string", () => {
    const ethAddress = null;
    const checksumAddress = getChecksumAddress(ethAddress);
    expect(checksumAddress).toEqual("");
  });
});
