import React from "react";

const employees = [
  { id: 1, name: "Juan Pérez", photo: "https://via.placeholder.com/100" },
  { id: 2, name: "María Gómez", photo: "https://via.placeholder.com/100" },
  { id: 3, name: "Carlos López", photo: "https://via.placeholder.com/100" },
  { id: 4, name: "Miguel Lauro", photo: "https://via.placeholder.com/100" },
  { id: 5, name: "Cristian Sato", photo: "https://via.placeholder.com/100" },
  { id: 6, name: "Laura Santos", photo: "https://via.placeholder.com/100" },
];

const EmployeeCards = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center py-8 bg-gradient-to-r from-green-300 via-teal-200 to-blue-300 min-h-screen">


      {/* Imagen sobre el título */}
      <img
        src="/eras.png" // Ruta de la imagen dentro de la carpeta public
        alt="Evaluación de satisfacción"
        className="w-64 h-64 mx-auto mb-4" // Tamaño y centrado de la imagen
      />

      {/* Employee Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full px-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            onClick={() => onSelect(employee)}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-32 h-32 rounded-full border-4 border-indigo-500 mb-4"
            />
            <p className="text-xl font-semibold text-gray-800">{employee.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCards;