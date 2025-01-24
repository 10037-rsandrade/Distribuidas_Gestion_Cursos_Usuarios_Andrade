'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cursoService } from '@/services/cursoService';
import { usuarioService } from '@/services/usuarioService';
import { use } from 'react';

export default function UsuariosCursoPage({ params }) {
  const id = use(Promise.resolve(params.id));
  const router = useRouter();
  const [curso, setCurso] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [todosUsuarios, setTodosUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [cursoData, usuariosCurso, todosUsuariosData] = await Promise.all([
        cursoService.getById(id),
        cursoService.getUsersByCurso(id),
        usuarioService.getAll(),
      ]);

      setCurso(cursoData);
      setUsuarios(usuariosCurso);
      setTodosUsuarios(todosUsuariosData);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los datos');
      setLoading(false);
    }
  };

  const handleAddUsuario = async (e) => {
    e.preventDefault();
    if (!usuarioSeleccionado) return;

    try {
      const usuario = todosUsuarios.find(u => u.id.toString() === usuarioSeleccionado);
      await cursoService.addUserToCurso(id, usuario);
      await loadData();
      setUsuarioSeleccionado('');
    } catch (err) {
      setError('Error al añadir el usuario al curso');
    }
  };

  const handleRemoveUsuario = async (usuarioId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario del curso?')) {
      try {
        await cursoService.removeUserFromCurso(id, usuarioId);
        await loadData();
      } catch (err) {
        setError('Error al eliminar el usuario del curso');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
      <p className="text-red-700">{error}</p>
    </div>
  );
  
  if (!curso) return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
      <p className="text-yellow-700">Curso no encontrado</p>
    </div>
  );

  const usuariosDisponibles = todosUsuarios.filter(
    usuario => !usuarios.some(u => u.id === usuario.id)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {curso.nombre}
        </h1>
        <p className="text-gray-800">{curso.descripcion}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Añadir Usuario al Curso</h2>
        <form onSubmit={handleAddUsuario} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="usuario">
              Seleccionar Usuario
            </label>
            <select
              id="usuario"
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            >
              <option value="">Seleccione un usuario</option>
              {usuariosDisponibles.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre} {usuario.apellido}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            Añadir
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usuarios Matriculados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Apellido</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{usuario.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{usuario.apellido}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{usuario.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleRemoveUsuario(usuario.id)}
                      className="text-red-600 hover:text-red-900 font-semibold"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push('/cursos')}
          className="px-6 py-2 bg-gray-100 text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition-colors"
        >
          Volver a Cursos
        </button>
      </div>
    </div>
  );
} 