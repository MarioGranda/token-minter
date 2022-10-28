import { ChangeEvent, useEffect, useState } from "react";
import {
  getTokenName,
  getTokenSymbol,
  getUserBalance,
} from "../../utils/tokenContract/getFunctions";
import { mintTokens } from "../../utils/tokenContract/mintFunction";
import "./style.css";

function App() {
  const [userBalance, setUserBalance] = useState(0);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
  });
  const [mintAddress, setMintAddress] = useState("");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMintAddress(value);
  };

  const handleOnClick = async () => {
    if (!mintAddress) {
      return;
    }
    const status = await mintTokens(mintAddress);
    if (status === 1) {
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 10000);
    }
  };

  return (
    <div className="App">
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
          <button className="mint-button" onClick={handleOnClick}>
            Mint Tokens
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
