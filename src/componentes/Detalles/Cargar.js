import { useEffect, useState } from 'react';
import axios from 'axios';
import './Cargar.css';

function Cargar() {
  const [auditoria, setAuditoria] = useState({});
  const [respuestas, setRespuestas] = useState({});
  const [formularioCompleto, setFormularioCompleto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriasColapsadas, setCategoriasColapsadas] = useState({});


  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:3002/preguntas');
        setAuditoria(response.data);
        setLoading(false);
      } catch (err) {
        setError("No se pudieron cargar las preguntas.");
        setLoading(false);
      }
    };
    fetchPreguntas();
  }, []);

  useEffect(() => {
    const totalPreguntas = Object.values(auditoria).reduce((total, preguntas) => total + preguntas.length, 0);
    const preguntasRespondidas = Object.values(respuestas).filter(r => r.estado).length;
    setFormularioCompleto(preguntasRespondidas === totalPreguntas);
  }, [respuestas, auditoria]);

  const manejarCambioRespuesta = (idPregunta, valor) => {
    setRespuestas(prev => ({
      ...prev,
      [idPregunta]: {
        estado: valor,
        observacion: prev[idPregunta]?.observacion || ""
      }
    }));
  };

  const manejarCambioTexto = (idPregunta, texto) => {
    setRespuestas(prev => ({
      ...prev,
      [idPregunta]: {
        estado: prev[idPregunta]?.estado || "",
        observacion: texto
      }
    }));
  };

  const toggleCategoria = (categoria) => {
    setCategoriasColapsadas(prev => ({
      ...prev,
      [categoria]: !prev[categoria],
    }));
  };


  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const uid = usuario?.uid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formularioCompleto) {
      alert("Por favor, responde todas las preguntas antes de enviar la auditoría.");
      return;
    }

    try {
      await axios.post('http://localhost:3002/auditoria', {
        uid,
        respuestas
      });
      alert("Auditoría enviada exitosamente");
      setRespuestas({});
    } catch (error) {
      alert("Error al enviar auditoría");
    }
  };

  if (loading) return <div>Cargando preguntas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cargar-container">
      <form onSubmit={handleSubmit}>
        {/* {Object.keys(auditoria).map((categoria) => (
          <div key={categoria} className="categoria">
            <h2>{categoria}</h2>
            {auditoria[categoria].map((item, i) => {
              const pregunta = item.texto;
              const norma = item.norma || "SinNorma";

              // Id único para esta pregunta
              const idPregunta = `${categoria}-${i}-${norma}`;

              return (
                <div key={idPregunta} className="pregunta">
                  <p><strong>{pregunta}</strong></p>
                  <small>Norma aplicable: {norma}</small>
                  <div className="opciones">
                    <label>
                      <input
                        type="radio"
                        name={idPregunta}
                        value="Cumple"
                        checked={respuestas[idPregunta]?.estado === "Cumple"}
                        onChange={() => manejarCambioRespuesta(idPregunta, "Cumple")}
                      /> ✅ Cumple
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={idPregunta}
                        value="En proceso"
                        checked={respuestas[idPregunta]?.estado === "En proceso"}
                        onChange={() => manejarCambioRespuesta(idPregunta, "En proceso")}
                      /> ⚠️ En proceso
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={idPregunta}
                        value="No cumple"
                        checked={respuestas[idPregunta]?.estado === "No cumple"}
                        onChange={() => manejarCambioRespuesta(idPregunta, "No cumple")}
                      /> ❌ No cumple
                    </label>
                  </div>
                  <textarea
                    placeholder="Observaciones, evidencias, comentarios..."
                    onChange={(e) => manejarCambioTexto(idPregunta, e.target.value)}
                    value={respuestas[idPregunta]?.observacion || ""}
                    rows="3"
                    className="input-observacion"
                  />
                </div>
              );
            })}

          </div>
        ))} */}
        {Object.keys(auditoria).map((categoria) => {
          const colapsada = categoriasColapsadas[categoria];

          return (
            <div key={categoria} className="categoria">
              <h2
                onClick={() => toggleCategoria(categoria)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                {colapsada ? '▶️' : '🔽'} {categoria}
              </h2>

              {!colapsada && auditoria[categoria].map((item, i) => {
                const pregunta = item.texto;
                const norma = item.norma || "Sin Norma";
                const idPregunta = `${categoria}-${i}-${norma}`;

                return (
                  <div key={idPregunta} className="pregunta">
                    <p><strong>{pregunta}</strong></p>
                    <small>Norma aplicable: {norma}</small>
                    <div className="opciones">
                      <label>
                        <input
                          type="radio"
                          name={idPregunta}
                          value="Cumple"
                          checked={respuestas[idPregunta]?.estado === "Cumple"}
                          onChange={() => manejarCambioRespuesta(idPregunta, "Cumple")}
                        /> ✅ Cumple
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={idPregunta}
                          value="En proceso"
                          checked={respuestas[idPregunta]?.estado === "En proceso"}
                          onChange={() => manejarCambioRespuesta(idPregunta, "En proceso")}
                        /> ⚠️ En proceso
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={idPregunta}
                          value="No cumple"
                          checked={respuestas[idPregunta]?.estado === "No cumple"}
                          onChange={() => manejarCambioRespuesta(idPregunta, "No cumple")}
                        /> ❌ No cumple
                      </label>
                    </div>
                    <textarea
                      placeholder="Observaciones, evidencias, comentarios..."
                      onChange={(e) => manejarCambioTexto(idPregunta, e.target.value)}
                      value={respuestas[idPregunta]?.observacion || ""}
                      rows="3"
                      className="input-observacion"
                    />
                  </div>
                );
              })}
            </div>
          );
        })}

        <button type="submit" className="boton-enviar">Enviar auditoría</button>
      </form>
    </div>
  );
}

export default Cargar;
