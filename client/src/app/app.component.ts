import { ApiService, Person } from './services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// this and the app.html are the root components, 
// because these are at the highest level whatever happens here
// will be seen across all child components created.
export class AppComponent implements OnInit {

  constructor(private apiService: ApiService) {
    this.apiService.getAllPeople().subscribe(retrievedObject => {
      this.data = retrievedObject;
      console.log(this.data.name);
      });
   }

  title =  "TIU Social Platform";
  data: Person;

  ngOnInit() {

  }
}
