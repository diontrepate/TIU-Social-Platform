import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonAppService } from '../services/common-app.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {

  userId: string;
  userBlob: User;

  constructor(private route: ActivatedRoute, private commonService: CommonAppService, private router: Router ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userBlob = this.commonService.getUser();
    console.log(this.userBlob)
    this.menuItems = [{
      // label: this.userBlob.firstName,
      items: [
      {label: 'Profile', icon: '', command: (event: any) => {router.navigate(['landing'])} },
      {label: 'Settings', icon: '', },
      {label: 'Help', icon: '', command: (event: any) => {router.navigate(['/help']); }},
             ]
},
];

   }

  menuItems: MenuItem[];

  ngOnInit() {
  }

}
