export interface Schedule {
    Id: number;
    StartTime: Date;
    EndTime: Date;
    UserId: number;
    JobId: number;
    FirstName: String;
    LastName: String;
    JobName: String;
    IsApproved: boolean;
}
