const BASE_URL = '/api';
const IMG_URL = 'http://localhost:8080/api/images/';

const request = async (method, path, data = null) => {
    const options = {
        method,
        credentials: 'include',
    };

    if (data instanceof File) {
        const formData = new FormData();
        formData.append('imageFile', data);
        options.body = formData;
    } else if (data !== null) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || 'Unbekannter Fehler');
        error.status = response.status;
        error.data = errorData;
        throw error;
    }

    if (response.status === 204) return null;

    return response.json();
};

const apiService = {
    get: (path) => request('GET', path),
    post: (path, data) => request('POST', path, data),
    patch: (path, data) => request('PATCH', path, data),
    put: (path, data) => request('PUT', path, data),
    delete: (path, data) => request('DELETE', path, data),
    getBaseUrl: () => BASE_URL,
    getImgUrl: () => IMG_URL,
};

export default apiService;