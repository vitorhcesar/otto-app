import type { IHttpClient } from '@/infra/http/http-client';

export abstract class BaseApiModule {
  constructor(protected readonly http: IHttpClient) {}
}
