import { ChangeEvent, useEffect, useState } from "react";
import {
  getTokenName,
  getTokenSymbol,
  getUserBalance,
} from "../../utils/tokenContract/getFunctions";
import "./style.css";

function App() {
  const [userBalance, setUserBalance] = useState(0);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
  });
  const [mintAddress, setMintAddress] = useState("");

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
          <button className="mint-button">Mint Tokens</button>
        </div>
      </div>
    </div>
  );
}

export default App;
