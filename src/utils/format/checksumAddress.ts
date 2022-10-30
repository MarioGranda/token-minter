import { ethers } from "ethers";
import { addressBytesLength } from "../../constants/address/bytesLength";

export const getChecksumAddress = (address: string) => {
  return ethers.utils.getAddress(
    ethers.utils.hexZeroPad(
      ethers.utils.hexStripZeros(address),
      addressBytesLength
    )
  );
};
