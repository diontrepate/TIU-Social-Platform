import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { EverythingNews } from '../models/newsEverything';
import { UserApiService } from '../services/UserApiService';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { SelectItem } from 'primeng/api';

export interface Item {
  title: string;
  link: string;
  linkToImage: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LandingPageComponent implements OnInit {

  feedStorage = [];

  user: User;

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
                this.feedStorage.push('heyyy', 'its lit', 'helllooo','kdlfj','sdlfhsdjf', 'ldsfhdl');

                this.postForm = this.fb.group({
                  post: ['', ],
                               });
                this.dropDown = this.fb.group({
                  selectedTopic: ''
                });

                this.user = {
                    id: 1,
                    username: 'diontrepate',
                    email: 'dpate@j.com',
                    password: 'cereal',
                    firstName: 'diontre',
                    lastName: 'pate',
                    groups: ['math', 'english', 'science'],
                    posts: ['Hey man how are you?', 'its Lit', 'heyyyyy'],
                  };

                this.topics = [
                  {label: '', value: ''},
                  {label: 'Sports', value: 'Sports'},
                  {label: 'Math', value: 'Math'},
                  {label: 'Communications', value: 'Communications'},
                  {label: 'Science', value: 'Science'},
              ];

                this.userId = this.route.snapshot.paramMap.get('id');

                this.userApiService.getUserInfoById(this.user).subscribe(userInfo => {
                  console.log(userInfo);
                  this.userInfo = userInfo;
    });


  }
  visibleSidebar1: boolean;

  ngOnInit() {

    this.userApiService.getNews('puppies', 'popular').subscribe(news => {

      for (const item of news.articles) {

       this.items.push ({
        title: item.title,
        link: item.url,
        linkToImage: item.urlToImage
        });

      }

      this.news = news;
    });


  }
  test() {
    console.log('here');
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
        title: item.title,
        link: item.url,
        linkToImage: item.urlToImage
        });

      }

      this.news = news;
      window.location.reload();

    });
  }

  
}
