import { useMemo } from 'react';

import { apiService } from '@/infra/http/services/api/api.service';

export function useApiService() {
  return useMemo(() => apiService, []);
}
