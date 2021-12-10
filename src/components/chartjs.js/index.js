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
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        min: 0,
      }
    }
  };
  
  const labels = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Months 1',
        data: [null, 50 , 70, 90, 110, 130, 150, 170, 190],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointHoverRadius: 10,
        pointRotation: 10,
        scaleStartValue: 0,
        hoverBackgroundColor: 'green'
      },
      {
        label: 'Months 2',
        data: [null, null, null, 120, 140, 160, 180, 200, 220],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
  function ReactCharts() {
    return (
        <>
        <h2 style={{margin: "30px", textAlign: "center"}}>ReactCharts by chartjs</h2>
      <div style={{ width: '90%', margin: 'auto' }} >
        <Line options={options} data={data} />
      </div>
      </>
    );
  }
  
  export default ReactCharts;