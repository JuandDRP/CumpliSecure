import { getAuth, signOut } from "firebase/auth";
import '../hojas-de-estilo/Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = ({ setUsuario }) => {
  const auth = getAuth();

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  const uidAutorizado = "fLKBPhmYSUhij2LHugVVTHuzmHn1"; 

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setUsuario(null); 
      localStorage.removeItem("usuario"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Auditoría</Link></li>
        {usuarioGuardado?.uid === uidAutorizado && (
          <li><Link to="/añadir">Añadir pregunta</Link></li>
        )}
        <li><Link to="/resultados">Resultados</Link></li>
        <li><Link to="/autor">Autor</Link></li>
        <li><button onClick={cerrarSesion}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};
