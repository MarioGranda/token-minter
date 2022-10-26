import { ethers } from "ethers";
import { useState } from "react";
import "./style.css";

const NavBar = () => {
  const [userWallet, setUserWallet] = useState(null);

  const connectWallet = async () => {
    if (userWallet) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
          <p>{userWallet ?? "Connect Metamask"}</p>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
