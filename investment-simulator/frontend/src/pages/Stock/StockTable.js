// src/components/StockTable.js
import React, { useState, useEffect } from 'react';
import { getMultipleStocksData } from '../../services/finnhub';
import styles from './styles/StockTable.module.css';
import Footer from '../../components/Footer/footer';

const StockTable = () => {
  const [stocksData, setStocksData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        setLoading(true);
        const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'AMD', 'INTC']; // Lista de 10 símbolos
        const data = await getMultipleStocksData(symbols);
        setStocksData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocksData();
  }, []);

  if (loading) return <p className={styles.loading}>Carregando dados...</p>;
  if (error) return <p className={styles.error}>Erro: {error}</p>;

  return (
    <div>
      <div className={styles.container}>
        <h1>Dados das Ações</h1>
        {stocksData.length === 0 ? (
          <p className={styles.noData}>Nenhum dado disponível.</p>
        ) : (
          <table className={styles.table}>
            <thead className={styles.header}>
              <tr>
                <th>Símbolo</th>
                <th>Preço Máximo (52 Semanas)</th>
                <th>Preço Mínimo (52 Semanas)</th>
                <th>Dividend Yield TTM</th>
                <th>Lucro por Ação TTM</th>
                <th>Margem de Lucro Bruta TTM</th>
                <th>Capitalização de Mercado</th>
              </tr>
            </thead>
            <tbody>
              {stocksData.map((stockData, index) => {
                const metrics = stockData?.metric || {};
                const symbol = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'AMD', 'INTC'][index]; // Associando o símbolo com o índice

                // Função auxiliar para formatar valores numéricos e porcentagens
                const formatNumber = (value) => value !== undefined && value !== null ? value.toFixed(2) : 'N/A';
                const formatPercentage = (value) => value !== undefined && value !== null ? `${value.toFixed(2)}%` : 'N/A';

                return (
                  <tr className={styles.row} key={symbol}>
                    <td className={styles.cell}>{symbol}</td>
                    <td className={styles.cell}>${formatNumber(metrics['52WeekHigh'])}</td>
                    <td className={styles.cell}>${formatNumber(metrics['52WeekLow'])}</td>
                    <td className={styles.cell}>{formatPercentage(metrics['currentDividendYieldTTM'])}</td>
                    <td className={styles.cell}>${formatNumber(metrics['epsTTM'])}</td>
                    <td className={styles.cell}>{formatPercentage(metrics['grossMarginTTM'])}</td>
                    <td className={styles.cell}>${metrics['marketCapitalization'] ? metrics['marketCapitalization'].toLocaleString() : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StockTable;
