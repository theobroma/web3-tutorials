import { useWeb3React } from '@web3-react/core';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import web3 from 'web3';
import './App.css';
import { apes, mainBgImage } from './data';
import { injected } from './wallet/Connector';

function App() {
  const { active, account, library, activate, deactivate } = useWeb3React();

  // Add minting toggle listener
  const [minting, setMinting] = useState(false);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function mint() {
    setMinting(true);
    const myAccount = '0x391EC0c94451e924C76a2B1ffc08268823f094e5'; // Account to receive payment
    const price = '0.01'; // This is the price in ETH

    const obj = {
      to: myAccount,
      from: account,
      value: web3.utils.toWei(price, 'ether'), // Needs to be converted to Wei units
      gas: 85000, // Eth ⛽ price
      gasLimit: '100000',
    };

    await library.eth.sendTransaction(obj, async (e, tx) => {
      if (e) {
        alert(`Something went wrong! Try switching accounts - ${e}`);
        console.log('ERROR->', e);
        setMinting(false);
      } else {
        setMinting(false);
      }
    });
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
              {/* <button type="button" className="sm-mint-button">
                Mint
              </button> */}
              {active ? (
                <button
                  type="button"
                  disabled={minting}
                  onClick={mint}
                  className="sm-mint-button"
                >
                  {minting ? 'Waiting confirmation.' : 'Mint'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={connect}
                  className="sm-mint-button"
                >
                  Connect Wallet To Mint
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
