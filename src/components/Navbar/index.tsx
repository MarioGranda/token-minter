import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { parseEthAddress } from "../../utils/address";
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
      return () =>
        window.ethereum.removeListener("accountsChanged", getAccount);
    }
  }, []);

  const connectWallet = async () => {
    if (userWallet) {
      return;
    }
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
