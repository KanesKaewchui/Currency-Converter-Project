import { useState } from "react";
import Select from "react-select";
import { currencyOptions } from "./CurrencyOptions";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState(currencyOptions[0]);
  const [toCurrency, setToCurrency] = useState(currencyOptions[1]);
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "d1edaf44ebe1f1d2851ba1b8";

  const handleConvert = async () => {
    setError("");
    setResult(null);
    try {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch conversion data. Status code: ${response.status}`
        );
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800">
          Currency Converter
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From:
          </label>
          <Select
            value={fromCurrency}
            onChange={(selectedOption) => setFromCurrency(selectedOption)}
            options={currencyOptions}
            getOptionLabel={(e) => (
              <div className="flex items-center">
                <img src={e.icon} alt="" className="w-8 h-5 rounded mr-2" />
                <span className="text-gray-700">{e.label}</span>
              </div>
            )}
            classNamePrefix="react-select"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To:
          </label>
          <Select
            value={toCurrency}
            onChange={(selectedOption) => setToCurrency(selectedOption)}
            options={currencyOptions}
            getOptionLabel={(e) => (
              <div className="flex items-center">
                <img src={e.icon} alt="" className="w-8 h-5 rounded mr-2" />
                <span className="text-gray-700">{e.label}</span>
              </div>
            )}
            classNamePrefix="react-select"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.valueAsNumber)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 text-gray-700"
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out">
          Convert
        </button>

        {result && (
          <p className="text-xl mt-6 text-center font-semibold text-blue-500">
            Result: {result}
          </p>
        )}
        {error && (
          <p className="text-red-500 mt-4 text-center font-medium">
            Error: {error}
          </p>
        )}
      </div>
    </div>
  );
}
