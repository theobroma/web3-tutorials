import { nanoid } from 'nanoid';
import './App.css';
import { apes, mainBgImage } from './data';

function App() {
  return (
    <div className="App">
      {/* MAIN BANNER */}
      <div
        className="main-card-wrapper"
        style={{ backgroundImage: `url(${mainBgImage})` }}
      >
        <div className="main-card__inner-wrapper">
          <h1 className="header-txt">React Minting Website</h1>
          <button type="button" className="main-mint-btn">
            Mint
          </button>
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
