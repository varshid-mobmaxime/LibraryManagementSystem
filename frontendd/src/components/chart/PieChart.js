import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ totalBooks = 0, issuedBooks = 0, availableBooks = 0 }) => {
  // Pie chart data
  const chartData = {
    series: [issuedBooks, availableBooks, totalBooks], // Data values
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Issued Books", "Available Books", "Total Books"], // Labels for each data point
      legend: {
        position: "bottom",
      },
      colors: ["#FF4560", "#008FFB", "#00E396"], // Custom colors for each section
    },
  };

  return (
    <div>
      <h2>Book Statistics</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="400"
      />
    </div>
  );
};

export default PieChart;
