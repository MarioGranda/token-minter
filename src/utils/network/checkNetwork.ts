import { ethers } from "ethers";
import { goerliChainId } from "../../constants/network/chainId";

export const checkNetwork = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { chainId } = await provider.getNetwork();
  return chainId === Number(goerliChainId);
};
