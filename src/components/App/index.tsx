import { useState } from "react";
import "./style.css";

function App() {
  const [userBalance, setUserBalance] = useState(null);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
  });

  return (
    <div className="App">
      <div className="token-data">
        <p>Token name: {token.name}</p>
        <p>Token symbol: {token.symbol}</p>
        <p>User balance: {userBalance}</p>
      </div>
      <div>
        <div className="mint-tokens">
          <input placeholder="Insert address" value=""></input>
          <button className="mint-button">Mint Tokens</button>
        </div>
      </div>
    </div>
  );
}

export default App;
