import { HttpClient, type IHttpClient } from '@/infra/http/http-client';
import { API_BASE_URL } from '@/infra/http/services/api/api-env';
import { AuthModule, type IAuthModule } from '@/infra/http/services/api/modules/auth.module';

export interface IApiServiceModules {
  auth: IAuthModule;
}

export interface IApiService {
  modules: IApiServiceModules;
}

export class ApiService implements IApiService {
  public readonly modules: IApiServiceModules;

  constructor(httpClient: IHttpClient = new HttpClient(API_BASE_URL)) {
    this.modules = {
      auth: new AuthModule(httpClient),
    };
  }
}

export const apiService = new ApiService();
