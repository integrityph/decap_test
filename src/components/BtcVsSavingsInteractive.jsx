// src/components/BtcVsSavingsInteractive.jsx
import { useState, useMemo } from 'preact/hooks';

// STEP 1: Import the main 'Chart' component, which is compatible.
import { Chart } from 'react-chartjs-2';

// STEP 2: Import Chart.js and all necessary elements to be registered.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// STEP 3: Register the elements with your ChartJS instance.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BtcVsSavingsInteractive({ btcPriceData }) {
  // All the state and calculation logic remains the same.
  const [monthlySavings, setMonthlySavings] = useState(100);
  const [periodInYears, setPeriodInYears] = useState(5);
  const periods = [1, 2, 5];

  const chartData = useMemo(() => {
    const totalMonths = periodInYears * 12;
    const monthlyInterestRate = 0.04 / 12;
    const historicalData = btcPriceData.slice(0, totalMonths);

    let savingsTotal = 0;
    let btcAmount = 0;

    const labels = [];
    const savingsDataPoints = [];
    const btcDataPoints = [];

    for (const record of historicalData) {
      savingsTotal += monthlySavings;
      savingsTotal *= (1 + monthlyInterestRate);
      
      const btcPrice = record.price;
      const btcBought = monthlySavings / btcPrice;
      btcAmount += btcBought;

      labels.push(record.date);
      savingsDataPoints.push(savingsTotal.toFixed(2));
      btcDataPoints.push((btcAmount * btcPrice).toFixed(2));
    }

    const finalSavings = savingsTotal;
    const finalBtc = btcAmount * (historicalData[historicalData.length - 1]?.price || 0);

    return {
      labels,
      savingsDataPoints,
      btcDataPoints,
      finalSavings,
      finalBtc,
    };
  }, [monthlySavings, periodInYears, btcPriceData]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Bitcoin (BTC)',
        data: chartData.btcDataPoints,
        borderColor: 'rgb(249, 148, 28)',
        backgroundColor: 'rgba(249, 148, 28, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Savings Account (4% APY)',
        data: chartData.savingsDataPoints,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Investment Growth Over Time' },
    },
    scales: {
        y: { ticks: { callback: value => `$${value}` } }
    }
  };

  return (
    <div className="interactive-section">
      {/* --- CONTROLS --- */}
      <div className="controls">
        <div className="control-group">
          <label htmlFor="monthly-saving">Monthly Saving ($)</label>
          <input
            id="monthly-saving"
            type="number"
            value={monthlySavings}
            onInput={(e) => setMonthlySavings(Number(e.currentTarget.value))}
            min="10"
          />
        </div>
        <div className="control-group">
          <label>Saving Period</label>
          <div className="button-group">
            {periods.map((p) => (
              <button
                key={p}
                className={periodInYears === p ? 'active' : ''}
                onClick={() => setPeriodInYears(p)}
              >
                {p} Year{p > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- FINAL TOTALS --- */}
      <div className="totals">
        <div className="total-card savings">
          <p>Savings Account Final Value</p>
          <span>
            ${chartData.finalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="total-card btc">
          <p>Bitcoin Final Value</p>
          <span>
            ${chartData.finalBtc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* --- CHART --- */}
      <div className="chart-container">
        {/* STEP 4: Use the generic Chart component and specify the type as 'line' */}
        <Chart type='line' options={options} data={data} />
      </div>

      { /* --- Component-Specific Styles --- */ }
      <style>{`
        /* Styles remain the same */
        .interactive-section { margin-top: 2rem; }
        .controls { display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .control-group { display: flex; flex-direction: column; }
        .control-group label { margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 500; color: #333; }
        .control-group input { padding: 0.5rem 0.75rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; width: 150px; }
        .button-group { display: flex; }
        .button-group button { padding: 0.5rem 1rem; border: 1px solid #ccc; background: #fff; cursor: pointer; transition: background-color 0.2s, border-color 0.2s; }
        .button-group button:first-child { border-radius: 6px 0 0 6px; }
        .button-group button:last-child { border-radius: 0 6px 6px 0; border-left: none; }
        .button-group button.active { background-color: #007bff; color: white; border-color: #007bff; }
        .totals { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .total-card { padding: 1.5rem; border-radius: 8px; color: white; }
        .total-card.savings { background: linear-gradient(to right, #22c55e, #16a34a); }
        .total-card.btc { background: linear-gradient(to right, #f97316, #ea580c); }
        .total-card p { margin: 0 0 0.5rem 0; font-size: 1rem; opacity: 0.9; }
        .total-card span { font-size: 2rem; font-weight: 700; }
        .chart-container { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
      `}</style>
    </div>
  );
}