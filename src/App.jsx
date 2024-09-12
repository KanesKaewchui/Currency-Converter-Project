import { useState } from "react";
import Select from 'react-select';
import { currencyOptions } from "./CurrencyOptions"; 

export default function App() {
  const [fromCurrency, setFromCurrency] = useState(currencyOptions[0]);
  const [toCurrency, setToCurrency] = useState(currencyOptions[1]);
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'd1edaf44ebe1f1d2851ba1b8';

  const handleConvert = async () => {
    setError("");
    setResult(null);
    try {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch conversion data. Status code: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.conversion_result) {
        throw new Error("Invalid data received from the server.");
      }
      
      setResult(data.conversion_result);
    } catch (error) {
      console.error("Error during conversion:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-1/5 p-8 rounded shadow-md">
        <h1 className="text-2xl mb-4">Currency Converter</h1>

        <div className="mb-4">
          <label className="block mb-2">From:</label>
          <Select
            value={fromCurrency}
            onChange={(selectedOption) => setFromCurrency(selectedOption)}
            options={currencyOptions}
            getOptionLabel={(e) => (
              <div className="flex items-center">
                <img src={e.icon} alt="" className="w-8 h-5 mr-2" />
                {e.label}
              </div>
            )}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">To:</label>
          <Select
            value={toCurrency}
            onChange={(selectedOption) => setToCurrency(selectedOption)}
            options={currencyOptions}
            getOptionLabel={(e) => (
              <div className="flex items-center">
                <img src={e.icon} alt="" className="w-8 h-5 mr-2" />
                {e.label}
              </div>
            )}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.valueAsNumber)}
            className="w-full p-2 border bg-white"
          />
        </div>

        <button
          onClick={handleConvert}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Convert
        </button>

        {result && <p className="text-lg mt-4">Result: {result}</p>}
        {error && <p className="text-red-500 mt-4">Error: {error}</p>} 
      </div>
    </div>
  );
}
