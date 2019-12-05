import { Post } from '../models/Post';
import { CommonAppService } from './../services/common-app.service';
import { Group } from './../models/Group';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { EverythingNews } from '../models/newsEverything';
import { UserApiService } from '../services/UserApiService';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { MenuItem, Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import {ConfirmationService} from 'primeng/api';

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

export class LandingPageComponent implements OnInit, OnDestroy {

  polling: any;

  newsSubscription: Subscription;
  createPostSubscription: Subscription;
  getAllPostSubscription: Subscription;
  createGroupSubscription: Subscription;
  getUserInfoSubscription: Subscription;
  deleteGroupSubscription: Subscription;

  constructor(private confirmationService: ConfirmationService, private userApiService: UserApiService, private commonService: CommonAppService, private router: Router, private route: ActivatedRoute, private authService: AuthService,
              private fb: FormBuilder) {

                this.addGroupForm = this.fb.group({
                  name: ['', ],
                  newsInterest: ['', ]
                });

                this.postForm = this.fb.group({
                  post: ['', ],
                  comment: ['', ],
                  generalPost: ['', ]
                               });


                this.userId = this.route.snapshot.paramMap.get('id');


                this.getAllPostSubscription = this.userApiService.getAllPosts().subscribe(posts => {
                  console.log(posts);
                  this.allPosts = posts;
                }
              );


                this.userApiService.getUserGroups(this.userId).subscribe(groups => {
                  
                  this.userGroups = groups;

                  console.log(groups);
                }


                );

                this.userApiService.getAllGroups().subscribe(allGroups => {
                  this.allGroups = allGroups;
                  console.log(this.allGroups);
                });

                this.getUserInfoSubscription = this.userApiService.getUserInfoById(this.userId).subscribe(userInfo => {
                  console.log(userInfo);
                  this.commonService.setUser(userInfo);
                  this.userInfo = userInfo;

                  if (this.userInfo.newsInterests === undefined) {
                    }


                  this.newsSubscription = this.userApiService.getNews('car', 'popular').subscribe(news => {

                    for (const item of news.articles) {

                     this.items.push ({
                      title: item.title,
                      link: item.url,
                      linkToImage: item.urlToImage
                      });

                    }

                    this.news = news;
                    console.log(this.news.articles[0].urlToImage);

                      });

                  this.setupMenu(router);
                  });


                  }
  createGroup: Group;
  allGroups: Group[];
  createPost: Post;
  allPosts: Post[];
  msgs: Message[] = [];
  groupPosts: Post[];
  userIdPojo: User;
  post: string;
  userId: string;
  postId: string;
  commentId: string;
  userInfo: User;
  userGroups: Group[];
  news: EverythingNews;
  items: Item[] = [];
  groupItems: Item[] = [];
  menuItems: MenuItem[];
  postItems: MenuItem[];
  commentItems: MenuItem[];
  filteredGroups: any[];
  chosenGroup: string;
  addGroupForm: FormGroup;
  postForm: FormGroup;
  isHome = true;
  isGroup = false;
  isFeed = true;
  display = false;
  groupPassed: Group;
  mobile: boolean;
  groupMap = new Map();
  private setupMenu(router: Router) {
    this.menuItems = [{
      label: this.userInfo.firstName,
      items: [
        { label: 'Profile', icon: '', },
        { label: 'Settings', icon: '', },
        { label: 'Help', icon: '', command: (event: any) => { router.navigate(['/help']); } },
        { label: 'Logout', icon: '', command: (event: any) => { router.navigate(['/login']); }}
      ]
    }, ];

    this.postItems = [{
      label: 'options',
      items: [{
        label: 'Delete Post', icon: 'pi pi-trash', command: (event: any) => { this.confirmPostDelete(event); }
      }]
    }];

    this.commentItems =[{
      label: 'options',
      items:[{
        label: 'Delete Post', icon: 'pi pi-trash', command: (event: any) => { this.confirmCommentDelete(event); }
      }]
    }]
  }

  setPostId(id: string) {
    this.postId = id;
  }
  setCommentId(id: string) {
    this.commentId = id;
  }

  confirmPostDelete(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this post?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
        accept: () => {
          this.deletePost(this.postId);
              },
        reject: () => {}
    });
}

confirmCommentDelete(event: any) {
  this.confirmationService.confirm({
    message: 'Do you want to delete this comment?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteComment(this.commentId);
            },
      reject: () => {}
  });
}

  ngOnInit() {

    if (window.innerWidth > 300 && window.innerWidth < 800) {
      this.mobile = true;
    }

  }

  getNewsForGroup(feed: string) {
    if (this.groupItems.length > 0) {
      this.clearArray();
    }

    this.isGroup = true;
    this.newsSubscription = this.userApiService.getNews(feed, 'popular').subscribe(news => {

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

  passCurrentGroup(group: Group) {
    this.groupPassed = group;
    this.userApiService.getGroupPosts(group.groupId).subscribe(groupPosts => {
      this.groupPosts = groupPosts;
    });

  }

  submitPost(general: boolean) {

    if (general) {
      this.post = this.postForm.get('generalPost').value;
      this.createPost = {
        uid: this.userId,
        bodyText: this.post,
      };

    } else {
      this.post = this.postForm.get('post').value;
      this.createPost = {
        uid: this.userId,
        bodyText: this.post,
        groupId: this.groupPassed.groupId,
      };

    }
    this.createPostSubscription = this.userApiService.createPosts(this.createPost).subscribe(createPost => {
      console.log('Heyy' + createPost);
    });


    this.postForm.reset();
  }

  deletePost(postId: string) {
    this.userApiService.deletePosts(postId).subscribe();
  }
  deleteComment(commentId: string) {
    this.userApiService.deleteComment(commentId).subscribe();
  }

  joinGroup() {
    this.userIdPojo = {
      uid: this.userId
    };
    this.userApiService.joinGroup(this.userIdPojo, this.groupMap.get(this.chosenGroup)).subscribe(group=>{
      console.log(group);
    });
  }

  updateNews() {}

  deleteAccount() {}

  changeName() {}

  changePassword() {}

  createComment() {


  }

  prepareGroupData() {
    for(let group of this.allGroups){
      if (group.name === this.chosenGroup){
        this.groupMap.set(this.chosenGroup, group.groupId);
        this.joinGroup();
      }
    }
   
  }
  leaveGroup() {
   this.deleteGroupSubscription = this.userApiService.removeUserFromGroup(this.groupPassed.groupId, this.userId).subscribe();
  }

  addGroup() {
    const author: string[] = [];

    author.push(this.userId);

    const newsToSend: string[] = [];
    newsToSend.push(this.addGroupForm.get('newsInterest').value);

    this.createGroup = {
      name: this.addGroupForm.get('name').value,
      newsInterests: newsToSend ,
      adminIdList: author
    };

    this.createGroupSubscription = this.userApiService.createGroups(this.createGroup).subscribe(group =>
      console.log(group));

    this.addGroupForm.reset();

  }

  showDialog() {
    this.display = true;
  }

  reformattedDate(date: string): string {

    const newDate = new Date(date).toLocaleString();
    return newDate;

  }

  filterGroups(event) {
    this.filteredGroups = [];
    for (let i = 0; i < this.allGroups.length; i++) {
        const group = this.allGroups[i].name;
        if (group.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.filteredGroups.push(group);
        }
    }
}


  ngOnDestroy(): void {
    this.getAllPostSubscription.unsubscribe();
    this.newsSubscription.unsubscribe();
    this.getUserInfoSubscription.unsubscribe();


  }


}
