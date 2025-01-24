const API_URL = 'http://localhost:8002/api/cursos';

export const cursoService = {
    getAll: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    },

    create: async (curso) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(curso),
        });
        return response.json();
    },

    update: async (id, curso) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(curso),
        });
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return response.status === 204;
    },

    // Métodos específicos para la gestión de usuarios en cursos
    getUsersByCurso: async (cursoId) => {
        const response = await fetch(`${API_URL}/${cursoId}/usuarios`);
        return response.json();
    },

    addUserToCurso: async (cursoId, usuario) => {
        const response = await fetch(`${API_URL}/${cursoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });
        return response.json();
    },

    removeUserFromCurso: async (cursoId, usuarioId) => {
        const response = await fetch(`${API_URL}/${cursoId}/usuarios/${usuarioId}`, {
            method: 'DELETE',
        });
        return response.status === 204;
    },
}; 