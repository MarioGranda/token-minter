import { goerliChainId } from "../../constants/network/chainId";
import getProvider from "./getProvider";

export const checkNetwork = async () => {
  const provider = getProvider();
  const { chainId } = await provider.getNetwork();
  return chainId === Number(goerliChainId);
};
