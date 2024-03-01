import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [usdAmount, setUSDAmount] = useState(0);
  const [bitcoinAmount, setBitcoinAmount] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const handleAmountChange = (event) => {
    setUSDAmount(event.target.value);
  };

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  useEffect(() => {
    if (selectedCoin && usdAmount > 0) {
      const selectedCoinData = coins.find(
        (coin) => coin.symbol === selectedCoin
      );
      if (selectedCoinData) {
        const bitcoinPrice = selectedCoinData.quotes.USD.price;
        const bitcoinAmount = usdAmount / bitcoinPrice;
        setBitcoinAmount(bitcoinAmount.toFixed(8)); // Limit to 8 decimal places
      }
    }
  }, [selectedCoin, usdAmount, coins]);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <br />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label htmlFor="usdAmount">Enter USD Amount:</label>
          <input
            type="number"
            id="usdAmount"
            value={usdAmount}
            onChange={handleAmountChange}
          />
          <br />
          <label htmlFor="coinSelect">Select a Coin:</label>
          <select id="coinSelect" onChange={handleCoinChange}>
            <option value="">Select a coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.symbol}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <br />
          {selectedCoin && usdAmount > 0 && (
            <p>
              With ${usdAmount} USD, you can buy approximately {bitcoinAmount}{" "}
              {selectedCoin}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
