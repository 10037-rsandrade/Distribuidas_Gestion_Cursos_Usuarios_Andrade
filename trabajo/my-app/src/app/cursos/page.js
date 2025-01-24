'use client';

import { useState, useEffect } from 'react';
import { cursoService } from '@/services/cursoService';

export default function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    try {
      const data = await cursoService.getAll();
      setCursos(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los cursos');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      try {
        await cursoService.delete(id);
        await loadCursos();
      } catch (err) {
        setError('Error al eliminar el curso');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cursos</h1>
        <a
          href="/cursos/nuevo"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Nuevo Curso
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => (
          <div key={curso.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{curso.nombre}</h2>
              <p className="text-gray-600 mb-4">{curso.descripcion}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Créditos: {curso.creditos}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <a
                  href={`/cursos/${curso.id}/usuarios`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Ver Usuarios
                </a>
                <div className="flex space-x-4">
                  <a
                    href={`/cursos/editar/${curso.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </a>
                  <button
                    onClick={() => handleDelete(curso.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 