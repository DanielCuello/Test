import React, { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(null);

  const levels = [
    { emoji: "😡", label: "Muy malo" },
    { emoji: "😞", label: "Malo" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Bueno" },
    { emoji: "😁", label: "Excelente" },
  ];

  const handleEmojiClick = (level) => {
    setSelected(level);

    // Obtener los datos existentes de LocalStorage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    // Guardar el nuevo feedback con la fecha actual
    const newFeedback = { level, timestamp: new Date().toISOString() };
    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    // Reiniciar la interfaz después de 2 segundos
    setTimeout(() => setSelected(null), 2000);
  };

  const getFeedbacks = () => {
    return JSON.parse(localStorage.getItem("feedbacks")) || [];
  };

  const getGroupedSummary = () => {
    const feedbacks = getFeedbacks();
    return levels.map((level, index) => ({
      label: level.label,
      emoji: level.emoji,
      count: feedbacks.filter((feedback) => feedback.level === index + 1).length,
    }));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Nivel de satisfacción</h1>
      {!selected ? (
        <div>
          <h2>Selecciona un nivel:</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {levels.map((item, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <button
                  onClick={() => handleEmojiClick(index + 1)}
                  style={{
                    fontSize: "2rem",
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  {item.emoji}
                </button>
                <p style={{ marginTop: "5px", fontSize: "0.9rem" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Gracias por tu respuesta!</h2>
          <p>Reiniciando...</p>
        </div>
      )}

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "50px" }}>
        <div>
          <h2>Historial de respuestas</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {getFeedbacks().map((feedback, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                Fecha: {new Date(feedback.timestamp).toLocaleString()} - Nivel:{" "}
                {levels[feedback.level - 1].label} {levels[feedback.level - 1].emoji}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Resumen agrupado</h2>
          <table style={{ margin: "0 auto", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid black", padding: "5px 10px" }}>Nivel</th>
                <th style={{ borderBottom: "2px solid black", padding: "5px 10px" }}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {getGroupedSummary().map((summary, index) => (
                <tr key={index}>
                  <td style={{ padding: "5px 10px" }}>
                    {summary.label} {summary.emoji}
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "center" }}>{summary.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;