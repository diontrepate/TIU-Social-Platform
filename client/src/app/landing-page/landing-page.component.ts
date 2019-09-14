import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { EverythingNews } from '../models/newsEverything';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
news: EverythingNews;

  constructor(apiService: ApiService) { 
    apiService.getNews('Math','popular').subscribe(news => {
      this.news = news;
      console.log(news);
    });
  }

  ngOnInit() {
  }

}
