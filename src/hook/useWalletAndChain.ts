import { useEffect, useState } from "react";
import { goerliChainId } from "../constants/network/chainId";
import { checkNetwork } from "../utils/network/checkNetwork";
import getProvider from "../utils/network/getProvider";

const useWalletAndChain = () => {
  const [userWallet, setUserWallet] = useState(null);
  const [chainId, setChainId] = useState<string | null>(null);

  const provider = getProvider();

  useEffect(() => {
    const getAccount = async () => {
      if (await checkNetwork()) {
        const accounts = await provider.send("eth_accounts", []);
        setUserWallet(accounts[0] ?? null);
      }
    };
    getAccount();
    const checkChain = async () => {
      if (!(await checkNetwork())) {
        setUserWallet(null);
        setChainId(null);
      } else {
        setChainId(goerliChainId);
        getAccount();
      }
    };
    checkChain();
    if (window?.ethereum) {
      window.ethereum.on("accountsChanged", getAccount);
      window.ethereum.on("chainChanged", checkChain);
      return () => {
        window.ethereum.removeListener("accountsChanged", getAccount);
        window.ethereum.removeListener("chainChanged", checkChain);
      };
    }
  }, []);

  return {
    chainId,
    userWallet,
  };
};

export default useWalletAndChain;
