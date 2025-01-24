'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cursoService } from '@/services/cursoService';

export default function NuevoCursoPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [curso, setCurso] = useState({
    nombre: '',
    descripcion: '',
    creditos: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cursoService.create({
        ...curso,
        creditos: parseInt(curso.creditos),
      });
      router.push('/cursos');
    } catch (err) {
      setError('Error al crear el curso');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Nuevo Curso</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del Curso
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={curso.nombre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={curso.descripcion}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="creditos">
            Créditos
          </label>
          <input
            type="number"
            id="creditos"
            name="creditos"
            value={curso.creditos}
            onChange={handleChange}
            min="1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear Curso
          </button>
          <button
            type="button"
            onClick={() => router.push('/cursos')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
} 