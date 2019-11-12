import { Comment } from './../models/comment';
import { Post } from './../models/post';
import { Group } from './../models/Group';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EverythingNews } from '../models/newsEverything';
import { UserApiService } from '../services/UserApiService';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { MenuItem } from 'primeng/api';

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

  constructor(private userApiService: UserApiService, private route: ActivatedRoute, private authService: AuthService,
              private fb: FormBuilder) {
                this.feedStorage.push('heyyy', 'its lit', 'helllooo', 'kdlfj', 'sdlfhsdjf', 'ldsfhdl');

                this.postForm = this.fb.group({
                  post: ['', ],
                               });

               // mock data
                this.secondComment = {
                id: '1',
                description: 'so cool'
              };
                this.specificComment.push(this.secondComment);
                this.secondPost = {
                id: '1',
                description: 'Whens the first meet up?',
                comments: this.comments,
              };
                this.thirdPost = {
                  id: '2',
                  description:'I love CS',
                  comments: this.comments
                };
                this.specificPost.push(this.secondPost);
                this.anotherPost.push(this.thirdPost);
                this.secondGroup = {
                  id: '2',
                  name: 'CS',
                  feed: 'cool',
                  posts: this.anotherPost
                };

                this.firstGroup = {
                 id: '1',
                 name: 'Math League',
                 feed: 'Math',
                 posts: this.specificPost
               };

                this.groups.push(this.firstGroup);
                this.groups.push(this.secondGroup);
                this.firstComment = {
                 id: '1',
                 description: 'so cool'
               };
                this.comments.push(this.firstComment);
                this.firstPost = {
                  id: '1',
                  description: 'yo I just ate some bomb food',
                  comments: this.comments,
                };
                this.posts.push(this.firstPost);
                this.user = {
                    id: '1',
                    username: 'diontrepate',
                    email: 'dpate@j.com',
                    password: 'cereal',
                    firstName: 'diontre',
                    lastName: 'pate',
                    groups: this.groups,
                    posts: this.posts,
                    newsTopic: 'Football'
                  };

                this.userId = this.route.snapshot.paramMap.get('id');

                this.userApiService.getUserInfoById(this.user).subscribe(userInfo => {
                  console.log(userInfo);
                  this.userInfo = userInfo;
                  this.menuItems = [{
                    label: this.userInfo.firstName,
                    items: [
                    {label: 'Profile', icon: ''},
                    {label: 'Settings', icon: ''},
                    {label: 'Help', icon: ''},
                ]
            },
            ];
    });


  }

  feedStorage = [];

  user: User;

  post: string;
  userId: string;

  userInfo: User;
  news: EverythingNews;
  items: Item[] = [];
  groupItems: Item[] = [];
  menuItems: MenuItem[];

  specificComment: Comment[] = [];
  specificPost: Post[] = [];
  anotherPost: Post[] = [];
  groups: Group[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];

  firstPost: Post;
  firstGroup: Group;
  secondGroup: Group;
  firstComment: Comment;
  secondPost: Post;
  thirdPost: Post;
  secondComment: Comment;

  postForm: FormGroup;
  isHome = true;
  isGroup = false;
  isFeed = true;
  display = false;
  groupPassed: Group;

  ngOnInit() {

    this.userApiService.getNews(this.user.newsTopic, 'popular').subscribe(news => {

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

  getNewsForGroup(feed: string) {
    if (this.groupItems.length > 0) {
      this.clearArray();
    }

    this.isGroup = true;
    this.userApiService.getNews(feed, 'popular').subscribe(news => {

      for (const item of news.articles) {

       this.groupItems.push ({
        title: item.title,
        link: item.url,
        linkToImage: item.urlToImage
        });

      }

      this.news = news;
    });
  }

  
  clearArray() {
    while (this.groupItems.length) {
      this.groupItems.pop();
    }
  }
  passCurrentGroup(group: any) {
    console.log(group)
    this.groupPassed = group;
  }

  submitPost() {
    this.post = this.postForm.get('post').value;
    this.feedStorage.push(this.post);

    this.postForm.reset();
  }

  updateNews() {}

  deleteAccount() {}

  changeName() {}

  changePassword() {}

}
