import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { goerliChainId } from "../../constants/network/chainId";
import { parseEthAddress } from "../../utils/format/address";
import "./style.css";

const NavBar = () => {
  const [userWallet, setUserWallet] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await provider.send("eth_accounts", []);
      setUserWallet(accounts[0] ?? null);
    };
    getAccount();
    if (window?.ethereum) {
      window.ethereum.on("accountsChanged", getAccount);
      window.ethereum.on("chainChanged", () => setUserWallet(null));
      return () => {
        window.ethereum.removeListener("accountsChanged", getAccount);
        window.ethereum.removeListener("chainChanged", () =>
          setUserWallet(null)
        );
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
