import { ethers } from "ethers";
import { goerliChainId } from "../../constants/network/chainId";
import useWalletAndChain from "../../hook/useWalletAndChain";
import { parseEthAddress } from "../../utils/format/address";
import "./style.css";

const NavBar = () => {
  const { userWallet } = useWalletAndChain();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

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
