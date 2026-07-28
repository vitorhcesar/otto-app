export type HttpRequestConfig = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean | undefined>;
};

export interface IHttpClient {
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T, B = unknown>(url: string, body?: B, config?: HttpRequestConfig): Promise<T>;
  put<T, B = unknown>(url: string, body?: B, config?: HttpRequestConfig): Promise<T>;
  patch<T, B = unknown>(url: string, body?: B, config?: HttpRequestConfig): Promise<T>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;
}

function buildUrl(url: string, params?: HttpRequestConfig['params']): string {
  if (!params) return url;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.set(key, String(value));
  }

  const query = search.toString();
  if (!query) return url;
  return `${url}${url.includes('?') ? '&' : '?'}${query}`;
}

export class HttpClient implements IHttpClient {
  constructor(private readonly baseUrl = '') {}

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T, B = unknown>(url: string, body?: B, config?: HttpRequestConfig): Promise<T> {
    return this.request<T>('POST', url, body, config);
  }

  async put<T, B = unknown>(url: string, body?: B, config?: HttpRequestConfig): Promise<T> {
    return this.request<T>('PUT', url, body, config);
  }

  async patch<T, B = unknown>(url: string, body?: B, config?: HttpRequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, body, config);
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${buildUrl(url, config?.params)}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...config?.headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: config?.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}
