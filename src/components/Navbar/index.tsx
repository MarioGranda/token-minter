import { goerliChainId } from "../../constants/network/chainId";
import useWalletAndChain from "../../hook/useWalletAndChain";
import { parseEthAddress } from "../../utils/format/address";
import getProvider from "../../utils/network/getProvider";
import "./style.css";

const NavBar = () => {
  const { userWallet } = useWalletAndChain();
  const provider = getProvider();

  const connectWallet = async () => {
    if (userWallet) {
      return;
    }
    await provider.send("wallet_switchEthereumChain", [
      { chainId: goerliChainId },
    ]);
    await provider.send("eth_requestAccounts", []);
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
