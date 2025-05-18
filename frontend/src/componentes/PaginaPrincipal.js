import { useState } from "react";
import imagen from "./GatoLogin.png";

function PaginaPrincipal({ setUsuario }) {
  const [registrando, setRegistrado] = useState(false);
 

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    try {
      const response = await fetch(
        registrando ? "http://localhost:3001/crear" : "http://localhost:3001/usuario",
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
      alert(error.message);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center h-screen flex-col">
      <form
        onSubmit={functAutenticacion}
        className="contenedor-principal flex flex-row h-50"
      >
        <div className="formulario w-50">
          <h1 className="text-5xl mt-5 mb-9 uppercase text-blue-300">INICIAR SESION</h1>
          <p className="text-blue-300 text-4xl text-left">Correo</p>
          <input className="input-email border-black text-black text-4xl mb-4" type="email" required id="email" />
          <p className="text-blue-300 text-4xl text-left">Contraseña</p>
          <input className="input-password border text-black text-4xl mb-2" type="password" required id="password" />
          <div className="botones flex justify-between items my-6">
            <button className="bg-blue-700 text-white px-4 py-2 rounded">
              {registrando ? "Registrate" : "Iniciar sesión"}
            </button>
          </div>
        </div>
        <div className="contenedor-imagen my-6 flex items-center">
          <img className="w-80 m-auto" src={imagen} alt="Gato del login" />
        </div>
      </form>

      <div className="botones flex justify-between my-6">
        <h1 className="text-blue-600 text-10 text-left">
          {registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setRegistrado(!registrando)}>
            {registrando ? "Iniciar sesión" : "Registrate"}
          </button>
        </h1>
      </div>
    </div>
  );
}

export default PaginaPrincipal;
