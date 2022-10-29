import { ChangeEvent, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { goerliChainId } from "../../constants/network/chainId";
import useWalletAndChain from "../../hook/useWalletAndChain";
import { checkNetwork } from "../../utils/network/checkNetwork";
import {
  getTokenName,
  getTokenSymbol,
  getUserBalance,
} from "../../utils/tokenContract/getFunctions";
import { mintTokens } from "../../utils/tokenContract/mintFunction";
import Banner from "../Banner";
import "./style.css";

function App() {
  const [userBalance, setUserBalance] = useState(0);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
  });
  const [mintAddress, setMintAddress] = useState("");
  const [banner, setBanner] = useState({
    showBanner: false,
    success: false,
  });
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const { chainId, userWallet } = useWalletAndChain();

  const isButtonEnabled =
    chainId === goerliChainId && mintAddress.length > 0 && userWallet;

  useEffect(() => {
    if (!userWallet) {
      return;
    }
    const getTokenAndBalance = async () => {
      setToken({
        name: await getTokenName(),
        symbol: await getTokenSymbol(),
      });
      setUserBalance(await getUserBalance());
    };
    if (window?.ethereum) {
      getTokenAndBalance();
    }
  }, [userWallet]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMintAddress(value);
  };

  const handleOnClick = async () => {
    setShowLoadingBar(true);
    const status = await mintTokens(mintAddress);
    setBanner({
      showBanner: true,
      success: status === 1,
    });
    setTimeout(() => {
      setBanner((prev) => ({ ...prev, showBanner: false }));
    }, 10000);
    if (status === 1 && mintAddress === userWallet) {
      setUserBalance(await getUserBalance());
    }
  };

  return (
    <div className="App">
      <Banner
        showBanner={banner.showBanner}
        userAddress={mintAddress}
        success={banner.success}
      />
      <div className="token-data">
        <p>Token name: {token.name}</p>
        <p>Token symbol: {token.symbol}</p>
        <p>User balance: {userBalance}</p>
      </div>
      <div>
        <div className="mint-tokens">
          <textarea
            placeholder="Insert address"
            value={mintAddress}
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <button
            className="mint-button"
            onClick={handleOnClick}
            disabled={!isButtonEnabled ?? true}
          >
            Mint Tokens
          </button>
        </div>
        {
          <div className="loader">
            <BarLoader
              color="#dcdcdc"
              speedMultiplier={0.5}
              width={500}
              loading={showLoadingBar}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
