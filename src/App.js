import React, { useState, useEffect } from 'react';
import './App.css';
import CashRegisterImage from './cash_register_image.jpg';

function App() {
  const [amount, setAmount] = useState(0);
  const [cashInRegister, setCashInRegister] = useState(0);

  useEffect(() => {
    // Fetch initial cash register balance
    fetchCashRegisterBalance();
  }, []);

  const fetchCashRegisterBalance = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/CashRegister');
      const data = await response.json();
      setCashInRegister(data.cashInRegister);
    } catch (error) {
      console.error('Error fetching cash register balance:', error);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleAddCash = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/CashRegister/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Amount: amount }),
      });
      const data = await response.json();
      console.log(data);
      setAmount(0);
      await fetchCashRegisterBalance();
    } catch (error) {
      console.error('Error adding cash:', error);
    }
  };

  const handleSubtractCash = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/CashRegister/subtract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Amount: amount }),
      });
      const data = await response.json();
      console.log(data);
      setAmount(0);
      await fetchCashRegisterBalance();
    } catch (error) {
      console.error('Error subtracting cash:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/CashRegister/reset', {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data);
      await fetchCashRegisterBalance();
    } catch (error) {
      console.error('Error resetting cash register:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cash Register App</h1>
        <img src={CashRegisterImage} alt="Cash Register" className="cash-register-image" />
        <div>Cash in Register: ${cashInRegister}</div>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <div className="buttons-container">
          <button className="add" onClick={handleAddCash}>Add Cash</button>
          <button className="subtract" onClick={handleSubtractCash}>Subtract Cash</button>
          <button className="reset" onClick={handleReset}>Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
