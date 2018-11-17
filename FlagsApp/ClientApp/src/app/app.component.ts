import { Component, OnInit } from '@angular/core';
import { User } from "./models/user"
import { HeaderService } from "./header.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  view = 'login';

  private user: User;

  constructor(public service: HeaderService) { }

  logged(user) {
    this.user = user;
    console.log(user);
    this.view = 'pretest';
  }

  pretest(results) {
    this.view = 'question';
  }

  question(results) {
    this.view = 'posttest';
  }

  posttest(results) {
    this.view = 'end';
  }

  ngOnInit() {

  }

}
