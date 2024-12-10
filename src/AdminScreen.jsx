import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  const exportToExcel = () => {
    if (feedbacks.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const data = feedbacks.map((f) => ({
      Empleado: f.employee?.name || "Desconocido",
      Nivel: f.level,
      Fecha: new Date(f.timestamp).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resumen");
    XLSX.writeFile(workbook, "resumen_satisfaccion.xlsx");
  };

  const groupedData = feedbacks.reduce((acc, curr) => {
    const employeeName = curr.employee?.name || "Desconocido";
    const satisfactionLevel = curr.level;

    acc[employeeName] = acc[employeeName] || { 1: 0, 2: 0, 3: 0, 4: 0 };
    acc[employeeName][satisfactionLevel]++;

    return acc;
  }, {});

  const employeeCharts = Object.keys(groupedData).map((employeeName) => {
    const data = groupedData[employeeName];
    return {
      label: employeeName,
      data: Object.values(data),
      backgroundColor: [
        "rgba(238, 9, 9, 0.959)",  // Muy Insatisfecho
        "rgba(236, 252, 11, 0.938)", // Insatisfecho
        "rgba(2, 217, 255, 0.952)",  // Satisfecho
        "rgba(2, 255, 44, 0.952)",  // Muy Satisfecho
      ],
    };
  });

  const totalData = feedbacks.reduce((acc, curr) => {
    acc[curr.level] = acc[curr.level] || 0;
    acc[curr.level]++;
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0 });

  const totalChartData = {
    labels: [
      "1 - Muy Insatisfecho",
      "2 - Insatisfecho",
      "3 - Satisfecho",
      "4 - Muy Satisfecho",
    ],
    datasets: [
      {
        label: "Total respuestas por nivel de satisfacción",
        data: Object.values(totalData),
        backgroundColor: [
          "rgba(238, 9, 9, 0.959)",  // Muy Insatisfecho
          "rgba(236, 252, 11, 0.938)", // Insatisfecho
          "rgba(2, 217, 255, 0.952)",  // Satisfecho
          "rgba(2, 255, 44, 0.952)",  // Muy Satisfecho
        ],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Resultados de Satisfacción</h1>

      <h2 className="text-2xl font-semibold mb-6">Gráficos de satisfacción por empleado</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employeeCharts.map((chart, index) => (
          <div key={index} className="flex flex-col items-center bg-white shadow-lg p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">{chart.label}</h3>
            <Doughnut data={{ labels: ["1", "2", "3", "4"], datasets: [chart] }} />
            <div className="mt-4 space-y-2">
              <p><span className="text-red-600">🔴</span> Muy Insatisfecho</p>
              <p><span className="text-yellow-500">🟡</span> Insatisfecho</p>
              <p><span className="#a5f3fc">🔵</span> Satisfecho</p>
              <p><span className="text-green-500">🟢</span> Muy Satisfecho</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-6">Total de respuestas por nivel de satisfacción</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/2">
          <Pie data={totalChartData} />
          <div className="mt-4 space-y-2">
            <p><span className="text-red-600">🔴</span> Muy Insatisfecho</p>
            <p><span className="text-yellow-500">🟡</span> Insatisfecho</p>
            <p><span className="text-blue-200">🔵</span> Satisfecho</p>
            <p><span className="text-green-500">🟢</span> Muy Satisfecho</p>
          </div>
        </div>

        <button
          onClick={exportToExcel}
          className="mt-4 md:mt-0 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default AdminScreen;
