import React, { useState } from "react";
import EmployeeCards from "./EmployeeCards";

const ClientScreen = () => {
  const [selected, setSelected] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const levels = [
    { emoji: "😡", label: "Muy malo" },
    { emoji: "😞", label: "Malo" },
    { emoji: "🙂", label: "Bueno" },
    { emoji: "😁", label: "Excelente" },
  ];

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEmojiClick = (level) => {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const newFeedback = { level, employee: selectedEmployee, timestamp: new Date().toISOString() };
    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    setSelected(level);

    // Reiniciar después de un tiempo para permitir al siguiente cliente elegir otro empleado
    setTimeout(() => {
      setSelected(null);
      setSelectedEmployee(null);  // Reiniciar empleado seleccionado
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-500 via-teal-400 to-blue-500">
      {/* Imagen como barra de navegación */}


      {/* Banner */}
      <div className="w-full text-center py-4 shadow-md mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Evaluación de Satisfacción</h1>
      </div>

      <div className="p-6 text-center flex-grow">
        {/* Si no se ha seleccionado un empleado */}
        {!selectedEmployee ? (
          <>
            <h1 className="text-3xl font-semibold text-white mb-4">Selecciona al empleado que te atendió</h1>
            <p className="text-xl text-white mb-4">Haz clic en una de las tarjetas para seleccionar al empleado</p>
            <EmployeeCards onSelect={handleEmployeeSelect} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-white mb-4">Evaluar a {selectedEmployee.name}</h1>
            {!selected ? (
              <div>
                <h2 className="text-2xl text-white mb-4">Selecciona un nivel de satisfacción:</h2>
                <div className="flex justify-center gap-10">
                  {levels.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiClick(index + 1)}
                      className="text-4xl p-6 rounded-full border-none bg-white hover:bg-gray-100 cursor-pointer transition-transform transform hover:scale-110"
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-white text-xl mt-4">¡Gracias por tu respuesta!</p>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-800 text-white py-4 mt-8">
        <p className="text-center text-sm">
          &copy; 2024 Empresa XYZ. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default ClientScreen;
