import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobOptions: Job[] = [];
  jobForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    protected userService: UserService,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.fetchJobOptions();
    this.createForm();
  }

  fetchJobOptions(): void {
    this.userService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobOptions = response;
      },
      error: (error) => {
        console.error('Error fetching job options:', error);
      }
    });
  }

  createForm():void{
    this.jobForm=this.fb.group({
      title:["",[Validators.required,Validators.minLength(1)]]
    });
  }

  addNewJob(){
    const job:Job=this.jobForm.value;
    this.jobService.addNewJob(job).subscribe({
      next: (response)=>{
        console.log("Job added successfully: ",response);
        location.reload()
      },
      error: (error) => {
        console.log("Failed to add job: ",error);
      }
    })
  }

  deleteJob(job:Job){
    this.jobService.deleteJob(job).subscribe({
      next: (response) => {
        console.log("Job deleted successfully: ",response);
        location.reload()
      },
      error: (error) => {
        console.log("Failed to delete job: ",error);
      }
    })
  }
}
