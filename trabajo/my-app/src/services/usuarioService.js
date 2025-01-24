const API_URL = 'http://localhost:8004/api/usuarios';

export const usuarioService = {
    getAll: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    },

    create: async (usuario) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });
        return response.json();
    },

    update: async (id, usuario) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });
        return response.json();
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return response.status === 204;
    },
}; 