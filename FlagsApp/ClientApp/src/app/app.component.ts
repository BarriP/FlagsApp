import { Component, OnInit } from '@angular/core';
import { User } from "./models/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  view = 'pretest';

  private user: User;

  logged(user) {
    this.user = user;
    console.log(user);
    this.view = 'pretest';
  }

  ngOnInit() {

  }

}
