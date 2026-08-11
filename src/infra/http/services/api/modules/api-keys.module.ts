import { BaseApiModule } from '@/infra/http/services/api/modules/base-api.module';

export type ApiKeyItem = {
  id: string;
  name: string;
  keyPrefix: string;
  isActive: boolean;
  createdAt: string;
};

export type CreatedApiKey = ApiKeyItem & {
  secret: string;
};

export type ApiKeyListResponse = {
  items: ApiKeyItem[];
};

export interface IApiKeysModule {
  list(query?: string): Promise<ApiKeyListResponse>;
  create(name: string): Promise<CreatedApiKey>;
  setActive(id: string, isActive: boolean): Promise<ApiKeyItem>;
  remove(id: string): Promise<void>;
}

export class ApiKeysModule extends BaseApiModule implements IApiKeysModule {
  list(query?: string) {
    return this.http.get<ApiKeyListResponse>('/api/v1/api-keys', {
      params: query?.trim() ? { q: query.trim() } : undefined,
    });
  }

  create(name: string) {
    return this.http.post<CreatedApiKey>('/api/v1/api-keys', { name });
  }

  setActive(id: string, isActive: boolean) {
    return this.http.patch<ApiKeyItem>(`/api/v1/api-keys/${id}`, { isActive });
  }

  remove(id: string) {
    return this.http.delete<void>(`/api/v1/api-keys/${id}`);
  }
}
