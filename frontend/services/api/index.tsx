const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_LINK;

interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
}

export async function apiRequest<T>(
    endpoint: string,
    { method, body }: RequestOptions
): Promise<T> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include'
        });

        console.log(response)

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }

        if (response.status === 204) {
            return {} as T; 
        } 

        return response.json();
    } catch(error: any) {
        console.error(`API Error [${method}] ${endpoint}:`, error.message);
        throw error; 
    }
}

