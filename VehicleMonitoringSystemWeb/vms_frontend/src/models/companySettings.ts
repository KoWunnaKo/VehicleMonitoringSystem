export default class CompanySettings {
  public companyId: number | undefined;
  public androidIntervalRecording: number | undefined;
  public androidIntervalSynchronization: number | undefined;

  constructor(companyId: number, androidIntervalRecording: number, androidIntervalSynchronization: number) {
    this.companyId = companyId;
    this.androidIntervalRecording = androidIntervalRecording;
    this.androidIntervalSynchronization = androidIntervalSynchronization;
  }
}
