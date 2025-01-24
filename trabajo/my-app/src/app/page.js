import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sistema de Gestión de Cursos
          </span>
        </h1>
        
        <p className="text-xl text-gray-800 mb-12 max-w-2xl mx-auto">
          Bienvenido al sistema de gestión de cursos y usuarios. Una plataforma moderna para administrar cursos y estudiantes de manera eficiente.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/usuarios"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Gestionar Usuarios
          </a>
          <a
            href="/cursos"
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Gestionar Cursos
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-3xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h3>
            <p className="text-gray-800">Administra fácilmente los usuarios del sistema</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-purple-600 text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión de Cursos</h3>
            <p className="text-gray-800">Crea y administra cursos de manera eficiente</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-indigo-600 text-3xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Matrículas</h3>
            <p className="text-gray-800">Gestiona las matrículas de usuarios en cursos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
