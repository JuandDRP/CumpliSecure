// import React, { useState } from "react";
// import axios from "axios";

// const Añadir = () => {
//     const [categoria, setCategoria] = useState("");
//     const [texto, setTexto] = useState("");
//     const [norma, setNorma] = useState("");
//     const [mensaje, setMensaje] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!categoria || !texto || !norma) {
//             setMensaje("Por favor completa todos los campos.");
//             return;
//         }

//         try {
//             const payload = { categoria, texto, norma };
//             await axios.post("http://localhost:3002/preguntas", payload);
//             setMensaje("Pregunta añadida correctamente.");
//             setCategoria("");
//             setTexto("");
//             setNorma("");
//         } catch (error) {
//             console.error("Error al añadir pregunta:", error);
//             setMensaje("Error al añadir la pregunta.");
//         }
//     };

//     return (
//         <div style={{ padding: "2rem", maxWidth: 600 }}>
//             <h2>Añadir pregunta</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: "1rem" }}>
//                     <label style={{ display: "block", marginBottom: "0.3rem" }}>
//                         Categoría:
//                     </label>
//                     <input
//                         type="text"
//                         value={categoria}
//                         onChange={(e) => setCategoria(e.target.value)}
//                         placeholder="Ej: 1. Seguridad de la información"
//                         style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
//                     />
//                 </div>

//                 <div style={{ marginBottom: "1rem" }}>
//                     <label style={{ display: "block", marginBottom: "0.3rem" }}>
//                         Texto de la pregunta:
//                     </label>
//                     <textarea
//                         value={texto}
//                         onChange={(e) => setTexto(e.target.value)}
//                         placeholder="Escribe la pregunta aquí"
//                         rows={3}
//                         style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
//                     />
//                 </div>

//                 <div style={{ marginBottom: "1rem" }}>
//                     <label style={{ display: "block", marginBottom: "0.3rem" }}>
//                         Norma:
//                     </label>
//                     <input
//                         type="text"
//                         value={norma}
//                         onChange={(e) => setNorma(e.target.value)}
//                         placeholder="Ej: ISO 27001"
//                         style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     style={{
//                         padding: "0.7rem 1.5rem",
//                         fontSize: "1rem",
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     Añadir Pregunta
//                 </button>
//             </form>

//             {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
//         </div>
//     );
// };

// export default Añadir;

import React, { useState } from "react";
import axios from "axios";

const Añadir = () => {
    const [categoria, setCategoria] = useState("");
    const [texto, setTexto] = useState("");
    const [norma, setNorma] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoria || !texto || !norma) {
            setMensaje("Por favor completa todos los campos.");
            return;
        }

        try {
            const payload = { categoria, texto, norma };
            await axios.post("http://localhost:3002/preguntas", payload);
            setMensaje("Pregunta añadida correctamente.");
            setCategoria("");
            setTexto("");
            setNorma("");
        } catch (error) {
            console.error("Error al añadir pregunta:", error);
            setMensaje("Error al añadir la pregunta.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Añadir Pregunta</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Ej: 1. Seguridad de la información"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texto de la pregunta
                    </label>
                    <textarea
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Escribe la pregunta aquí"
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Norma
                    </label>
                    <input
                        type="text"
                        value={norma}
                        onChange={(e) => setNorma(e.target.value)}
                        placeholder="Ej: ISO 27001"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Añadir Pregunta
                </button>
            </form>

            {mensaje && (
                <p className="mt-4 text-sm text-center text-gray-700 font-medium">
                    {mensaje}
                </p>
            )}
        </div>
    );
};

export default Añadir;
