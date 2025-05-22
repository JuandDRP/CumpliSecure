// import { useState } from "react";
// import imagen from "./GatoLogin.png";

// function PaginaPrincipal({ setUsuario }) {
//   const [registrando, setRegistrado] = useState(false);
 

//   const functAutenticacion = async (e) => {
//     e.preventDefault();
//     const correo = e.target.email.value;
//     const contraseña = e.target.password.value;

//     try {
//       const response = await fetch(
//         registrando ? "https://cumplisecure.onrender.com/crear" : "https://cumplisecure.onrender.com/usuario",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ correo, contraseña }),
//         }
//       );

//       const resultado = await response.json();

//       if (!response.ok) {
//         throw new Error(resultado.error || "Error en la autenticación");
//       }

//       setUsuario(resultado.user); 

//       localStorage.setItem("usuario", JSON.stringify(resultado.user)); 


//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="bg-black flex justify-center items-center h-screen flex-col">
//       <form
//         onSubmit={functAutenticacion}
//         className="contenedor-principal flex flex-row h-50"
//       >
//         <div className="formulario w-50">
//           <h1 className="text-5xl mt-5 mb-9 uppercase text-blue-300">INICIAR SESION</h1>
//           <p className="text-blue-300 text-4xl text-left">Correo</p>
//           <input className="input-email border-black text-black text-4xl mb-4" type="email" required id="email" />
//           <p className="text-blue-300 text-4xl text-left">Contraseña</p>
//           <input className="input-password border text-black text-4xl mb-2" type="password" required id="password" />
//           <div className="botones flex justify-between items my-6">
//             <button className="bg-blue-700 text-white px-4 py-2 rounded">
//               {registrando ? "Registrate" : "Iniciar sesión"}
//             </button>
//           </div>
//         </div>
//         <div className="contenedor-imagen my-6 flex items-center">
//           <img className="w-80 m-auto" src={imagen} alt="Gato del login" />
//         </div>
//       </form>

//       <div className="botones flex justify-between my-6">
//         <h1 className="text-blue-600 text-10 text-left">
//           {registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}
//           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setRegistrado(!registrando)}>
//             {registrando ? "Iniciar sesión" : "Registrate"}
//           </button>
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default PaginaPrincipal;

import { useState } from "react";
import imagen from "./GatoLogin.png";

function PaginaPrincipal({ setUsuario }) {
  const [registrando, setRegistrado] = useState(false);
  const [error, setError] = useState("");

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    try {
      const response = await fetch(
        registrando ? "https://cumplisecure.onrender.com/crear" : "https://cumplisecure.onrender.com/usuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contraseña }),
        }
      );

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.error || "Error en la autenticación");
      }

      setUsuario(resultado.user);
      localStorage.setItem("usuario", JSON.stringify(resultado.user));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={functAutenticacion}
        className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full"
      >
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center uppercase">
            {registrando ? "Regístrate" : "Inicia Sesión"}
          </h1>

          <label htmlFor="email" className="text-gray-700 font-medium mb-1">
            Correo
          </label>
          <input
            className="border rounded-md px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            placeholder="ejemplo@correo.com"
            required
          />

          <label htmlFor="password" className="text-gray-700 font-medium mb-1">
            Contraseña
          </label>
          <input
            className="border rounded-md px-4 py-3 mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            placeholder="********"
            required
          />

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
          >
            {registrando ? "Registrarse" : "Iniciar sesión"}
          </button>

          <p className="text-sm mt-4 text-center text-gray-600">
            {registrando ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setRegistrado(!registrando);
                setError("");
              }}
              className="text-blue-500 hover:underline ml-1"
            >
              {registrando ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={imagen} alt="Gato del login" className="w-64 object-contain" />
        </div>
      </form>
    </div>
  );
}

export default PaginaPrincipal;
