import { ethers } from "ethers";
import { abi } from "../../constants/token/abi";
import { address } from "../../constants/token/address";

const getTokenContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};

export const mintTokens = async (to: string) => {
  const contract = await getTokenContract();
  const tx = await contract.mint(to, 1);
  const receipt = await tx.wait();
  return receipt.status;
};
