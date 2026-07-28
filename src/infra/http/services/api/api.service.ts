import { HttpClient, type IHttpClient } from '@/infra/http/http-client';
import { API_BASE_URL } from '@/infra/http/services/api/api-env';

export interface IApiServiceModules {
  // Registrar modules aqui conforme os recursos da API forem criados.
  // Ex.: orders: IOrdersModule;
}

export interface IApiService {
  modules: IApiServiceModules;
}

export class ApiService implements IApiService {
  public readonly modules: IApiServiceModules;

  constructor(httpClient: IHttpClient = new HttpClient(API_BASE_URL)) {
    void httpClient;
    this.modules = {
      // Ex.: orders: new OrdersModule(httpClient),
    };
  }
}

export const apiService = new ApiService();
