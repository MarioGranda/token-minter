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
        <div>
          <input placeholder="Insert address" value=""></input>
          <button>Mint Tokens</button>
        </div>
      </div>
    </div>
  );
}

export default App;
