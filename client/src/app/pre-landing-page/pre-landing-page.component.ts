import { User } from './../models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { UserApiService } from '../services/UserApiService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pre-landing-page',
  templateUrl: './pre-landing-page.component.html',
  styleUrls: ['./pre-landing-page.component.scss']
})
export class PreLandingPageComponent implements OnInit, OnDestroy {


  userDetailsForm: FormGroup;
  userId: string;
  userDetails: User;
  selectedMajor: string;
  selected2Major: string;
  selectedYear: string;
  majorsToSend: string[] = [];
  subscription: Subscription;

  major: SelectItem[];
  year: SelectItem[];

  constructor(private userApiService: UserApiService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder ) {

    this.userId = this.route.snapshot.paramMap.get('id');


    this.major = [
    {label: 'Math', value: 'Math'},
    {label: 'Computer Science', value: 'Computer Science'},
    {label: 'Science', value: 'Science'},
    {label: 'English', value: 'English'},
    {label: 'Communications', value: 'Communications'},
    {label: 'History', value: 'History'},
    {label: 'Physical Therapy', value: 'Physical Therapy'},
    {label: 'Athletic Training', value: 'Athletic Training'},
    {label: 'Business', value: 'Business'}
  ];

    this.year = [
      {label: 'Freshman', value: 'Freshman'},
      {label: 'Sophomore', value: 'Sophomore'},
      {label: 'Junior', value: 'Junior'},
      {label: 'Senior', value: 'Senior'},
      {label: 'Graduate', value: 'Graduate'},
      {label: 'Faculty', value: 'Faculty'},
    ];

    this.userDetailsForm = this.fb.group({
      interest: ['', [Validators.required, Validators.minLength(1)]],
    });

  }

  beginningBanner = true;
  secondStep = false;

  ngOnInit() {}

  sendUserDetails() {
    this.majorsToSend.push(this.selectedMajor);
    this.majorsToSend.push(this.selected2Major);
    const interestToSend = [];
    interestToSend.push(this.userDetailsForm.get('interest').value);

    this.userDetails = {
      uid: this.userId,
      newsInterests: interestToSend,
      majors:  this.majorsToSend,
      academicYear: this.selectedYear
      };

    this.subscription = this.userApiService.patchUserDetails(this.userDetails).subscribe(userDetails => {console.log(userDetails);
                                                                                                         this.navToUpload();
    });


  }

  navToUpload() {
    this.clearArray();
    this.router.navigate(['/upload', this.userId]);
  }

  clearArray() {
    while (this.majorsToSend.length) {
      this.majorsToSend.pop();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
