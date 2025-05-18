import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Resultados = () => {
  const [evaluacion, setEvaluacion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioGuardado || !usuarioGuardado.uid) {
      setError("Usuario no autenticado");
      return;
    }

    const obtenerEvaluacion = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3002/auditoria/${usuarioGuardado.uid}`);
        if (!respuesta.ok) throw new Error("No se pudo obtener la auditoría");
        const data = await respuesta.json();
        setEvaluacion(data.evaluacion);
      } catch (err) {
        console.error(err);
        setError("Error al obtener los resultados");
      }
    };

    obtenerEvaluacion();
  }, []);

  if (error) return <p>{error}</p>;
  if (!evaluacion) return <p>Cargando resultados...</p>;

  const isoData = [
    { name: "Cumple", value: evaluacion.ISO_27001 },
    { name: "No cumple", value: 100 - evaluacion.ISO_27001 },
  ];
  const nistData = [
    { name: "Cumple", value: evaluacion.NIST_CSF },
    { name: "No cumple", value: 100 - evaluacion.NIST_CSF },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  const renderLabel = ({ percent, name, value }) => {
    return `${name}: ${value.toFixed(2)}%`;
  };

  const obtenerRecomendacion = (norma, valor) => {
    if (norma === "ISO 27001") {
      if (valor < 50) return "Reforzar políticas de seguridad de la información.";
      if (valor < 75) return "Fortalecer controles de acceso y realizar una auditoría interna.";
      return "Buen cumplimiento, mantener prácticas y revisar puntos débiles identificados.";
    }
    if (norma === "NIST CSF") {
      if (valor < 50) return "Evaluar capacidades de detección y respuesta ante incidentes.";
      if (valor < 75) return "Mejorar planes de recuperación y continuidad operativa.";
      return "Cumplimiento adecuado, continuar monitoreando riesgos cibernéticos.";
    }
    return "";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Resultados de la Auditoría</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ISO 27001 */}
        <div className="text-center">
          <h3 className="font-semibold mb-2">
            ISO 27001 - {evaluacion.ISO_27001.toFixed(2)}%
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={isoData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={renderLabel}
              >
                {isoData.map((entry, index) => (
                  <Cell key={`iso-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toFixed(2) + '%'} />
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-4 text-sm italic text-gray-600">
            Recomendación: {obtenerRecomendacion("ISO 27001", evaluacion.ISO_27001)}
          </p>
        </div>

        {/* NIST CSF */}
        <div className="text-center">
          <h3 className="font-semibold mb-2">
            NIST CSF - {evaluacion.NIST_CSF.toFixed(2)}%
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={nistData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={renderLabel}
              >
                {nistData.map((entry, index) => (
                  <Cell key={`nist-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toFixed(2) + '%'} />
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-4 text-sm italic text-gray-600">
            Recomendación: {obtenerRecomendacion("NIST CSF", evaluacion.NIST_CSF)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resultados;
