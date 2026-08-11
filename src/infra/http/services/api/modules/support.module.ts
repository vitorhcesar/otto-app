import { BaseApiModule } from '@/infra/http/services/api/modules/base-api.module';

export const PROBLEM_REPORT_MAX_LENGTH = 200;

export type ProblemReport = {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
};

export type ProblemReportListResponse = {
  items: ProblemReport[];
};

export interface ISupportModule {
  createProblemReport(message: string): Promise<ProblemReport>;
  listProblemReports(): Promise<ProblemReportListResponse>;
}

export class SupportModule extends BaseApiModule implements ISupportModule {
  createProblemReport(message: string) {
    return this.http.post<ProblemReport>('/api/v1/support/problem-reports', {
      message,
    });
  }

  listProblemReports() {
    return this.http.get<ProblemReportListResponse>(
      '/api/v1/support/problem-reports',
    );
  }
}
