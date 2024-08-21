// src/pages/HistoryPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './styles/HistoryPage.module.css';
import Footer from '../../components/Footer/footer';

ChartJS.register(LineElement, PointElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

const HistoryPage = () => {
  const location = useLocation();
  const [history, setHistory] = useState(() => {
    // Recupera o histórico armazenado no localStorage ou usa o histórico da localização
    const savedHistory = localStorage.getItem('simulationHistory');
    return savedHistory ? JSON.parse(savedHistory) : location.state?.history || [];
  });

  useEffect(() => {
    // Atualiza o localStorage apenas se o history mudar
    if (location.state?.history) {
      const newHistory = location.state.history;
      setHistory(newHistory);
      localStorage.setItem('simulationHistory', JSON.stringify(newHistory));
    }
  }, [location.state?.history]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Histórico de Simulações', 10, 10);

    const tableData = history.map(item => [
      item.amount,
      item.rate,
      item.time,
      item.finalAmount,
      item.type === 'fixed' ? 'Renda Fixa' : 'Renda Variável'
    ]);
    
    autoTable(doc, {
      startY: 20,
      head: [['Valor Inicial', 'Taxa de Juros (%)', 'Tempo (anos)', 'Valor Final', 'Tipo de Investimento']],
      body: tableData,
    });

    doc.save('historico_simulacoes.pdf');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Valor Inicial,Taxa de Juros (%),Tempo (anos),Valor Final,Tipo de Investimento\n"
      + history.map(item => `${item.amount},${item.rate},${item.time},${item.finalAmount},${item.type === 'fixed' ? 'Renda Fixa' : 'Renda Variável'}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historico_simulacoes.csv");
    document.body.appendChild(link);
    link.click();
  };

  const getChartData = () => {
    if (!Array.isArray(history)) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Valor Final',
            data: [],
            borderColor: '#0056b3',
            backgroundColor: 'rgba(0, 86, 179, 0.2)',
            fill: true,
          }
        ],
      };
    }

    const labels = history.map((_, index) => `Simulação ${index + 1}`);
    const data = history.map(item => item.finalAmount);

    return {
      labels,
      datasets: [
        {
          label: 'Valor Final',
          data,
          borderColor: '#0056b3',
          backgroundColor: 'rgba(0, 86, 179, 0.2)',
          fill: true,
        }
      ],
    };
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Histórico de Simulações</h1>
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.exportButton}`} onClick={handleExportPDF}>Exportar PDF</button>
          <button className={`${styles.button} ${styles.exportButton}`} onClick={handleExportCSV}>Exportar CSV</button>
        </div>
        <div className={styles.chart}>
          <Chart type="line" data={getChartData()} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (context) => `R$${context.raw}`,
                }
              }
            }
          }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
