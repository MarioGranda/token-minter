import "./style.css";

function App() {
  return (
    <div className="App">
      <div className="token-data">
        <p>Token name:</p>
        <p>Token symbol:</p>
        <p>User balance:</p>
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
