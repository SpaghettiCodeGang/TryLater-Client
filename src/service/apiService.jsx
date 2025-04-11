const BASE_URL = '/api';

const request = async (method, path, data = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
        credentials: 'include',
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            // TODO: Aus HomePage weiterleiten
            console.log('Unauthorized');
            console.log("Weiterleitung auf HomePage fehlt...")
        }

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
    put: (path, data) => request('PUT', path, data),
    delete: (path, data) => request('DELETE', path, data),
};

export default apiService;
