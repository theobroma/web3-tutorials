import { nanoid } from 'nanoid';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import { apes, mainBgImage } from './data';
import { injected } from './wallet/Connector';

function App() {
  const { active, account, library, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="App">
      {/* MAIN BANNER */}
      <div
        className="main-card-wrapper"
        style={{ backgroundImage: `url(${mainBgImage})` }}
      >
        <div className="main-card__inner-wrapper">
          <h1 className="header-txt">React Minting Website</h1>
          {active ? (
            <button type="button" className="main-mint-btn">
              Mint
            </button>
          ) : (
            <button type="button" onClick={connect} className="main-mint-btn">
              Connect Wallet To Mint
            </button>
          )}
        </div>
      </div>

      {/* APE LIST */}
      <div className="cards-wrapper">
        {apes.map((ape, index) => (
          <div className="cards-item" key={nanoid()}>
            <div className="img-wrapper">
              <img src={ape.img} alt={`ape_${index}`} />
            </div>
            <div className="btn-wrapper">
              <button type="button" className="sm-mint-button">
                Mint
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
