// src/pages/SimulatorPage.js
import React, { useState, useEffect } from 'react';
import styles from './styles/SimulatorPage.module.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/footer';

const SimulatorPage = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [investmentType, setInvestmentType] = useState('fixed');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('investmentHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('investmentHistory', JSON.stringify(history));
  }, [history]);

  const handleSimulation = (e) => {
    e.preventDefault();

    if (!amount || !rate || !time) {
      setError('Por favor, preencha todos os campos.');
      setResult(null);
      return;
    }

    const initialAmount = parseFloat(amount);
    const interestRate = parseFloat(rate);
    const timeYears = parseFloat(time);

    if (initialAmount <= 0 || interestRate <= 0 || timeYears <= 0) {
      setError('Os valores devem ser positivos.');
      setResult(null);
      return;
    }

    let finalAmount;
    if (investmentType === 'fixed') {
      finalAmount = initialAmount * Math.pow(1 + interestRate / 100, timeYears);
    } else {
      finalAmount = initialAmount * (1 + (interestRate / 100 * timeYears));
    }

    const formattedFinalAmount = finalAmount.toFixed(2);
    setResult(formattedFinalAmount);
    setError('');

    const newHistoryEntry = { 
      amount: initialAmount, 
      rate: interestRate, 
      time: timeYears, 
      finalAmount: formattedFinalAmount, 
      type: investmentType 
    };

    setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
  };

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    setter(value);

    if (!amount || !rate || !time) {
      setResult(null);
      setError('');
    }
  };

  const handleViewHistory = () => {
    navigate('/history', { state: { history } });
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Simulador de Investimentos</h1>
        <form className={styles.form} onSubmit={handleSimulation}>
          <input
            type="number"
            placeholder="Valor Inicial"
            value={amount}
            onChange={handleInputChange(setAmount)}
            className={`${styles.input} ${amount ? styles.inputFilled : ''}`}
          />
          <input
            type="number"
            placeholder="Taxa de Juros (%)"
            value={rate}
            onChange={handleInputChange(setRate)}
            className={`${styles.input} ${rate ? styles.inputFilled : ''}`}
          />
          <input
            type="number"
            placeholder="Tempo (anos)"
            value={time}
            onChange={handleInputChange(setTime)}
            className={`${styles.input} ${time ? styles.inputFilled : ''}`}
          />
          <div className={styles.selectContainer}>
            <label>
              <input
                type="radio"
                value="fixed"
                checked={investmentType === 'fixed'}
                onChange={() => setInvestmentType('fixed')}
              />
              Renda Fixa
            </label>
            <label>
              <input
                type="radio"
                value="variable"
                checked={investmentType === 'variable'}
                onChange={() => setInvestmentType('variable')}
              />
              Renda Variável
            </label>
          </div>
          <button type="submit" className={styles.button}>Simular</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        {result && (
          <div className={styles.result}>
            <h2>Valor Final: R${result}</h2>
          </div>
        )}
        {history.length > 0 && (
          <button className={`${styles.button} ${styles.historyButton}`} onClick={handleViewHistory}>Ver Histórico</button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SimulatorPage;
