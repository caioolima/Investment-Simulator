import axios from 'axios';

const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Substitua pela sua chave da API

export const fetchInterestRate = async () => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: 'YOUR_SYMBOL', // Exemplo: 'MSFT' para Microsoft
        apikey: API_KEY,
      },
    });
    // Processar e retornar a taxa de juros ou outros dados relevantes
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};
