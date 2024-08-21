// src/services/finnhub.js
export const getStockData = async (symbol) => {
  const apiKey = 'cr2ord9r01qgsq6mmbmgcr2ord9r01qgsq6mmbn0'; // Chave API do Finnhub
  const url = `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da API: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Teste de chave API bem-sucedido para ${symbol}:`, data);
    return data;
  } catch (error) {
    console.error(`Erro ao testar chave API para ${symbol}:`, error);
    throw error;
  }
};

export const getMultipleStocksData = async (symbols) => {
  const requests = symbols.map(symbol => getStockData(symbol));
  return Promise.all(requests);
};
