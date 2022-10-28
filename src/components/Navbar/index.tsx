import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { goerliChainId } from "../../constants/network/chainId";
import { parseEthAddress } from "../../utils/format/address";
import { checkNetwork } from "../../utils/network/checkNetwork";
import "./style.css";

const NavBar = () => {
  const [userWallet, setUserWallet] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const getAccount = async () => {
      if (await checkNetwork()) {
        const accounts = await provider.send("eth_accounts", []);
        setUserWallet(accounts[0] ?? null);
      }
    };
    getAccount();
    const onChainChange = async () => {
      if (!(await checkNetwork())) {
        setUserWallet(null);
      }
    };
    if (window?.ethereum) {
      window.ethereum.on("accountsChanged", getAccount);
      window.ethereum.on("chainChanged", onChainChange);
      return () => {
        window.ethereum.removeListener("accountsChanged", getAccount);
        window.ethereum.removeListener("chainChanged", onChainChange);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (userWallet) {
      return;
    }
    await provider.send("wallet_switchEthereumChain", [
      { chainId: goerliChainId },
    ]);
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length === 0) {
      return;
    }
    setUserWallet(accounts[0]);
  };
  return (
    <header>
      <div className="navbar">
        <button
          className="connect-metamask"
          onClick={connectWallet}
          disabled={userWallet !== null}
        >
          <p>{userWallet ? parseEthAddress(userWallet) : "Connect Metamask"}</p>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
