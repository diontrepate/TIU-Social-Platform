import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EverythingNews } from '../models/newsEverything';
import { UserApiService } from '../services/UserApiService';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { SelectItem } from 'primeng/api';

export interface Item {
  description: string;
  link: string;
  linkToImage: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LandingPageComponent implements OnInit {

  feedStorage = [];

  post: string;
  userId: string;

  userInfo: User;
  news: EverythingNews;
  items: Item[] = [];
  topics: SelectItem[];

  postForm: FormGroup;
  dropDown: FormGroup;

  isFeed = true;
  display = false;

  constructor(private userApiService: UserApiService, private route: ActivatedRoute, private authService: AuthService,
              private fb: FormBuilder) {
                this.feedStorage.push('heyyy','its lit','helllooo');

                this.postForm = this.fb.group({
                  post: ['', ],
                               });
                this.dropDown = this.fb.group({
                  selectedTopic: ''
                });

                this.topics = [
                  {label: '', value: ''},
                  {label: 'Sports', value: 'Sports'},
                  {label: 'Math', value: 'Math'},
                  {label: 'Communications', value: 'Communications'},
                  {label: 'Science', value: 'Science'},
              ];

                this.userId = this.route.snapshot.paramMap.get('id');

                this.userApiService.getUserInfoById(this.userId).subscribe(userInfo => {
      this.userInfo = userInfo;
    });


  }
  visibleSidebar1: boolean;

  ngOnInit() {

    this.userApiService.getNews('puppies', 'popular').subscribe(news => {

      for (const item of news.articles) {

       this.items.push ({
        description: item.description,
        link: item.url,
        linkToImage: item.urlToImage
        });

      }

      this.news = news;
    });

 
  }

  submitPost() {
    this.post = this.postForm.get('post').value;
    this.feedStorage.push(this.post);

    this.postForm.reset();
  }

  updateNews() {
    const topic = this.dropDown.get('selectedTopic').value;
    this.userApiService.getNews(topic, 'popular').subscribe(news => {

      for (const item of news.articles) {

       this.items.push
       ({
        description: item.description,
        link: item.url,
        linkToImage: item.urlToImage
        });

      }

      this.news = news;
      window.location.reload();

    });
  }
}
