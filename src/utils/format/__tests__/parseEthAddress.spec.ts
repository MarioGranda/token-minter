import { parseEthAddress } from "../parseEthAddress";

describe("parseEthAddress", () => {
  it("should return a fixed length string", () => {
    const ethAddress = "0x1DB4AFfFa9235478Ff5d5ec90F521E65ec2dF685";
    const parsedEthAddress = parseEthAddress(ethAddress);
    expect(parsedEthAddress).toEqual("0x1DB4...F685");
  });
});
