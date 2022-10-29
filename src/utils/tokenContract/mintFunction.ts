import { ethers } from "ethers";
import { abi } from "../../constants/token/abi";
import { address } from "../../constants/token/address";
import { mintAmount } from "../../constants/token/mint";
import getProvider from "../network/getProvider";

const getTokenContract = async () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};

export const mintTokens = async (to: string) => {
  const contract = await getTokenContract();
  const tx = await contract.mint(to, mintAmount);
  const receipt = await tx.wait();
  return receipt.status;
};
