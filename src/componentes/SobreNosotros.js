function SobreNosotros() {
  return (
    <div className="flex justify-center bg-white py-0 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full flex flex-col sm:flex-row items-center gap-8 my-6">
        <img
          src="/imagenes/Juan.jpg"
          alt="Foto de Juan"
          className="w-44 h-44 rounded-full object-cover border-4 border-gray-200 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Juan de Dios Rodriguez Perez
          </h2>
          <p className="text-gray-600 text-base mb-2">Codigo: 2210004</p>
          
        </div>
      </div>
    </div>
  );
}

export default SobreNosotros;
