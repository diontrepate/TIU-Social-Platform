import { User } from './../models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserApiService } from '../services/UserApiService';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
 
  constructor(private userApiService: UserApiService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.userId = this.route.snapshot.paramMap.get('id');

  }

  encodedFile: string[];
  userImage: User;
  userId: string;

  url: string;

  subscription: Subscription;

  ngOnInit() {
  }
  onBasicUpload(event) {
    this.url = event.files[0].objectURL.changingThisBreaksApplicationSecurity;
    this.url = btoa(this.url);

    /*below is for decoding*/

    // this.url = atob(this.url);



    this.userImage = {
        uid: this.userId,
        storageItem: this.url
        };

    this.subscription = this.userApiService.uploadUserImage(this.userImage).subscribe();

  }

  sanitize( url: string ) {
   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  routeToLanding() {
    this.router.navigate(['/landing', this.userId]);
  }

  ngOnDestroy(): void {
  }
}
