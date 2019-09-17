import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { EverythingNews } from '../models/newsEverything';
import { UserApiService } from '../services/UserApiService';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {
  userId: string;
  userInfo: User;
  news: EverythingNews;

  constructor(private userApiService: UserApiService, private route: ActivatedRoute, private authService: AuthService) {
    
    this.userId = this.route.snapshot.paramMap.get('id');

    this.authService.getUserInfoById(this.userId).subscribe(userInfo => {
      this.userInfo = userInfo;
    });


  }

  ngOnInit() {

    this.userApiService.getNews('Sports', 'popular').subscribe(news => {
      this.news = news;
      console.log(news);
    });

    console.log(this.userId);
    // nothing to do here
  }
}
